import React, { useState, useEffect, useCallback } from 'react';

// Kullanıcının temasına uygun renkler ve font
// Koyu tema uyumu için renkleri koruduk.
const PRIMARY_COLOR = 'indigo-500'; // Daha parlak indigo
const SECONDARY_COLOR = 'indigo-400';

// API Sabitleri
const MODEL_NAME = "gemini-2.5-flash-image-preview";
const API_URL_BASE = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent`;
const API_KEY = ""; // Canvas ortamında otomatik sağlanacaktır.

/**
 * Sayfa Başlığı Bileşeni Emülasyonu (Kullanıcının PageHeading bileşenini taklit eder)
 */
const PageHeadingEmulator = ({ title, bgSrc, pageLinkText }) => (
    <div 
        className="relative bg-gray-900 h-64 md:h-80 flex items-center justify-center text-white overflow-hidden"
        style={{ backgroundImage: `url(${bgSrc})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.7)' }}
    >
        {/* Arka plan overlay'i (Kullanıcının temasına uygun koyu/mor overlay) */}
        <div className="absolute inset-0 bg-indigo-900 opacity-70"></div>
        
        <div className="relative z-10 text-center p-4">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-2 uppercase tracking-wide">{title}</h1>
            <p className="text-lg text-indigo-300 font-medium">{pageLinkText}</p>
        </div>
    </div>
);

/**
 * Ana Uygulama Bileşeni
 */
export default function App() {
    const [base64ImageData, setBase64ImageData] = useState(null);
    const [prompt, setPrompt] = useState('Arka planı tamamen kaldır');
    const [processedImageUrl, setProcessedImageUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState('info');

    // Başlangıçta kaydırma işlemini taklit et
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const displayMessage = useCallback((msg, type = 'info') => {
        setMessage(msg);
        setMessageType(type);
    }, []);

    const fetchWithExponentialBackoff = useCallback(async (url, options, maxRetries = 5) => {
        for (let i = 0; i < maxRetries; i++) {
            try {
                const response = await fetch(url, options);

                if (response.status === 429 || response.status >= 500) {
                    if (i === maxRetries - 1) throw new Error("API'den tekrar eden başarısız yanıtlar.");
                    
                    const delay = Math.pow(2, i) * 1000 + Math.floor(Math.random() * 1000);
                    await new Promise(resolve => setTimeout(resolve, delay));
                    continue;
                }

                if (!response.ok) {
                    const errorBody = await response.text();
                    throw new Error(`API Hatası: ${response.status} - ${errorBody}`);
                }

                return response.json();

            } catch (error) {
                if (i === maxRetries - 1) throw error;
                const delay = Math.pow(2, i) * 1000 + Math.floor(Math.random() * 1000);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }, []);

    const processImage = useCallback(async () => {
        if (!base64ImageData || isLoading) return;

        setIsLoading(true);
        setProcessedImageUrl('https://placehold.co/300x300/27272a/a1a1aa?text=İşleniyor...');
        
        if (!prompt) {
            setIsLoading(false);
            displayMessage('Lütfen bir düzenleme isteği (prompt) girin.', 'error');
            return;
        }

        const payload = {
            contents: [{
                parts: [
                    { text: prompt },
                    {
                        inlineData: {
                            mimeType: base64ImageData.startsWith('data:image/png') ? 'image/png' : 'image/jpeg',
                            data: base64ImageData.split(',')[1]
                        }
                    }
                ]
            }],
            generationConfig: {
                responseModalities: ['TEXT', 'IMAGE']
            },
        };

        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        };

        try {
            const result = await fetchWithExponentialBackoff(`${API_URL_BASE}?key=${API_KEY}`, options);

            const base64Data = result?.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData?.data;

            if (!base64Data) {
                throw new Error("API'den görsel veri alınamadı. Lütfen daha spesifik bir istek deneyin.");
            }

            const imageUrl = `data:image/png;base64,${base64Data}`;
            setProcessedImageUrl(imageUrl);
            displayMessage('Görsel başarıyla düzenlendi! Sağdaki görseli kaydedebilirsiniz.', 'success');

        } catch (error) {
            console.error("Görsel işleme hatası:", error);
            setProcessedImageUrl('https://placehold.co/300x300/450a0a/fca5a5?text=Hata');
            displayMessage(`Hata oluştu: ${error.message || 'Lütfen tekrar deneyin.'}`, 'error');

        } finally {
            setIsLoading(false);
        }
    }, [base64ImageData, prompt, isLoading, fetchWithExponentialBackoff, displayMessage]);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (!file) {
            setBase64ImageData(null);
            setProcessedImageUrl(null);
            return;
        }

        if (!file.type.startsWith('image/')) {
            displayMessage('Lütfen geçerli bir görsel dosyası yükleyin.', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            setBase64ImageData(e.target.result);
            setProcessedImageUrl('https://placehold.co/300x300/27272a/a1a1aa?text=Hazır');
            displayMessage('Görsel başarıyla yüklendi. İstediğiniz düzenlemeyi yazıp butona tıklayın.', 'info');
        };
        reader.readAsDataURL(file);
    };

    const getMessageBoxClasses = () => {
        let base = "mt-6 p-4 rounded-xl text-sm font-medium border";
        if (!message) return "hidden";

        switch (messageType) {
            case 'success':
                // Koyu tema başarı rengi
                return `${base} bg-green-900 text-green-300 border-green-700`;
            case 'error':
                 // Koyu tema hata rengi
                return `${base} bg-red-900 text-red-300 border-red-700`;
            default:
                 // Koyu tema bilgi rengi
                return `${base} bg-indigo-900 text-indigo-300 border-indigo-700`;
        }
    };


    return (
        <div className="font-sans antialiased bg-gray-900 min-h-screen">
            
            {/* 1. PageHeading Emülasyonu */}
            <PageHeadingEmulator
                title="Arka Plan Düzenleme Aracı"
                bgSrc="https://placehold.co/1200x300/4f46e5/ffffff?text=Grafik+Tasarım+Aracı" 
                pageLinkText="Yeni Web Aracımız"
            />
            
            {/* Spacing lg='150' md='80' emülasyonu */}
            <div className="pt-24 md:pt-40"></div>
            
            {/* 2. Ana İçerik Konteyneri */}
            <div className="relative z-10"> 
                {/* Sitenizin özel şekil veya dekoratif arka planı buraya gelecektir. (cs-shape_wrap_4) */}

                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex flex-wrap -mx-4"> {/* Row emülasyonu */}
                        <div className="w-full lg:w-1/3 px-4"> {/* SectionHeading alanı emülasyonu (col-xl-4) */}
                            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                                Görselinizi Yükleyin ve İstenen Arka Planı Anında Oluşturun
                            </h2>
                            <div className="h-10"></div> {/* Spacing lg='90' md='45' emülasyonu */}
                        </div>

                        <div className="w-full lg:w-2/3 px-4"> {/* Ana Araç Alanı (col-xl-8) */}
                            {/* Ana kart koyu temaya uygun */}
                            <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8 border border-indigo-900">
                                
                                <h3 className="text-xl font-semibold mb-6 text-indigo-300">Düzenleme Kontrolleri</h3>

                                {/* Etkileşim Alanı */}
                                <div className="flex flex-col md:flex-row gap-4 mb-6 items-end">
                                    {/* Dosya Yükleme */}
                                    <div className="flex-1 w-full">
                                        <label className="block mb-2 text-sm font-medium text-gray-400">1. Görsel Yükle (PNG/JPG)</label>
                                        <input 
                                            type="file" 
                                            accept="image/*" 
                                            onChange={handleImageUpload} 
                                            // Koyu temaya uygun input stili
                                            className="w-full border border-gray-600 rounded-lg p-2.5 bg-gray-700 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 transition duration-150"
                                        />
                                    </div>

                                    {/* İstek Metni */}
                                    <div className="flex-1 w-full">
                                        <label className="block mb-2 text-sm font-medium text-gray-400">2. Düzenleme İsteği (Prompt)</label>
                                        <input 
                                            type="text" 
                                            placeholder="Örn: Arka planı bembeyaz yap" 
                                            value={prompt}
                                            onChange={(e) => setPrompt(e.target.value)}
                                            // Koyu temaya uygun input stili
                                            className="w-full border border-gray-600 rounded-lg p-2.5 bg-gray-700 text-white focus:ring-indigo-500 focus:border-indigo-500 transition"
                                        />
                                    </div>

                                    {/* İşlem Butonu */}
                                    <div className="w-full md:w-auto">
                                        <button 
                                            onClick={processImage}
                                            disabled={!base64ImageData || isLoading}
                                            className={`w-full px-6 py-2.5 font-semibold rounded-lg transition duration-150 flex items-center justify-center ${
                                                !base64ImageData || isLoading
                                                    // Butonun devre dışı (disabled) stili
                                                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                                    // Butonun aktif stili (PRIMARY_COLOR)
                                                    : `bg-${PRIMARY_COLOR} hover:bg-${SECONDARY_COLOR} text-white shadow-lg shadow-indigo-800/50`
                                            }`}
                                        >
                                            <span className="mr-2">{isLoading ? 'Oluşturuluyor...' : 'Düzenle ve Oluştur'}</span>
                                            {isLoading && (
                                                <div className="loader ml-3" style={{borderTopColor: '#fff', borderColor: 'rgba(255,255,255,0.3)'}}></div>
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Görsel Sonuçları Alanı */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                                    {/* Orijinal Görsel */}
                                    <div className="flex flex-col items-center">
                                        <h4 className="text-md font-medium text-gray-300 mb-3">Orijinal Görsel</h4>
                                        <div className="w-full h-80 bg-gray-700 rounded-lg flex justify-center items-center p-2 border-dashed border-2 border-gray-600">
                                            <img 
                                                src={base64ImageData || 'https://placehold.co/300x300/27272a/a1a1aa?text=Görsel+Yükle'}
                                                alt="Orijinal Görsel Önizlemesi" 
                                                className="max-h-full max-w-full object-contain rounded-md shadow-lg" 
                                            />
                                        </div>
                                    </div>

                                    {/* İşlenmiş Görsel */}
                                    <div className="flex flex-col items-center">
                                        <h4 className="text-md font-medium text-gray-300 mb-3">İşlenmiş Görsel</h4>
                                        <div className="w-full h-80 bg-gray-700 rounded-lg flex justify-center items-center p-2 border-dashed border-2 border-gray-600 relative">
                                            {/* Transparan arka plan deseni için (koyu temaya uygun) */}
                                            <div className="absolute inset-0 opacity-10 repeating-checkered-dark"></div>
                                            <img 
                                                src={processedImageUrl || 'https://placehold.co/300x300/27272a/a1a1aa?text=Sonuç+Burada+Görünecek'} 
                                                alt="İşlenmiş Görsel Önizlemesi" 
                                                className="max-h-full max-w-full object-contain rounded-md relative z-10 shadow-lg"
                                            />
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Mesaj Kutusu */}
                                <div className={getMessageBoxClasses()}>
                                    {message}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Spacing lg='90' md='80' emülasyonu */}
            <div className="pt-24 md:pt-40"></div>

            {/* Cta Emülasyonu */}
            <div className="container mx-auto px-4 max-w-7xl">
                <div 
                    // Koyu temaya uygun CTA stili
                    className={`p-8 md:p-12 rounded-2xl flex flex-col md:flex-row justify-between items-center text-white bg-indigo-600 shadow-2xl shadow-indigo-900/50`}
                    style={{ backgroundImage: 'url(/images/ctabg.png)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.9)' }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-0 leading-tight">
                        Markanızı bizimle <br />büyütmeye ne dersiniz?
                    </h2>
                    <a href="/iletisim" className={`px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-200 transition duration-300 shadow-md`}>
                        Şimdi Başla!
                    </a>
                </div>
            </div>

            <div className="pt-24 md:pt-40"></div>
            
        </div>
    );
}

// Sitenizin CSS stillerini React içinde tanımlıyoruz
const styles = `
    /* Inter fontunu kullanma */
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
    body {
        font-family: 'Inter', sans-serif;
    }
    .container {
        max-width: 1280px; /* max-w-7xl eşdeğeri */
    }
    .loader {
        /* Koyu temaya uygun yükleyici */
        border: 4px solid rgba(255, 255, 255, 0.3); 
        border-top: 4px solid #fff; 
        border-radius: 50%;
        width: 20px;
        height: 20px;
        animation: spin 1s linear infinite;
    }
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    /* Şeffaflık deseni (koyu tema için) */
    .repeating-checkered-dark {
        background-color: #3f3f46; /* gray-700 */
        background-image: linear-gradient(45deg, #27272a 25%, transparent 25%, transparent 75%, #27272a 75%, #27272a),
                          linear-gradient(45deg, #27272a 25%, transparent 25%, transparent 75%, #27272a 75%, #27272a);
        background-size: 10px 10px;
        background-position: 0 0, 5px 5px;
    }
`;

// Stilleri sayfaya ekle
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
