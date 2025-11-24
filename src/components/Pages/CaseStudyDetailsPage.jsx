import React, { useState, useEffect, useCallback } from 'react';

// Kullanıcının temasına uygun renkler ve font
const PRIMARY_COLOR = 'indigo-600';
const SECONDARY_COLOR = 'indigo-700';

// API Sabitleri
const MODEL_NAME = "gemini-2.5-flash-image-preview";
const API_URL_BASE = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent`;
const API_KEY = ""; // Canvas ortamında otomatik sağlanacaktır.

// Özel Bileşen Emülasyonları
// Spacing ve Div gibi özel bileşenler yerine doğrudan Tailwind sınıflarını kullanıyoruz.

/**
 * Sayfa Başlığı Bileşeni Emülasyonu (Kullanıcının PageHeading bileşenini taklit eder)
 */
const PageHeadingEmulator = ({ title, bgSrc, pageLinkText }) => (
    <div 
        className="relative bg-gray-900 h-64 md:h-80 flex items-center justify-center text-white overflow-hidden"
        style={{ backgroundImage: `url(${bgSrc})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
        {/* Arka plan overlay'i (Kullanıcının temasına uygun, muhtemelen koyu bir overlay) */}
        <div className="absolute inset-0 bg-black opacity-60"></div>
        
        <div className="relative z-10 text-center p-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{title}</h1>
            <p className="text-lg text-gray-300">{pageLinkText}</p>
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

    /**
     * Mesaj kutusunda kullanıcıya bilgi gösterir.
     */
    const displayMessage = useCallback((msg, type = 'info') => {
        setMessage(msg);
        setMessageType(type);
    }, []);

    /**
     * Exponential Backoff ile fetch işlemi
     */
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

    /**
     * Görsel İşleme Fonksiyonu
     */
    const processImage = useCallback(async () => {
        if (!base64ImageData || isLoading) return;

        setIsLoading(true);
        setProcessedImageUrl('https://placehold.co/300x300/cccccc/333333?text=İşleniyor...');
        
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
                            // Dosya türünü buradan çıkarmanın bir yolunu bulamadık,
                            // ancak genellikle tarayıcıdaki file input'tan alınabilir. 
                            // Güvenlik nedeniyle varsayılan olarak JPG/PNG kabul ediyoruz.
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
            setProcessedImageUrl('https://placehold.co/300x300/ffdddd/cc0000?text=Hata');
            displayMessage(`Hata oluştu: ${error.message || 'Lütfen tekrar deneyin.'}`, 'error');

        } finally {
            setIsLoading(false);
        }
    }, [base64ImageData, prompt, isLoading, fetchWithExponentialBackoff, displayMessage]);

    /**
     * Dosya yükleme olayını yönetir
     */
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
            setProcessedImageUrl('https://placehold.co/300x300/e0e0e0/505050?text=Hazır');
            displayMessage('Görsel başarıyla yüklendi. İstediğiniz düzenlemeyi yazıp butona tıklayın.', 'info');
        };
        reader.readAsDataURL(file);
    };

    /**
     * Mesaj kutusunun Tailwind sınıflarını hesaplar
     */
    const getMessageBoxClasses = () => {
        let base = "mt-6 p-4 rounded-xl text-sm font-medium";
        if (!message) return "hidden";

        switch (messageType) {
            case 'success':
                // Sitenizin başarı rengi
                return `${base} bg-green-100 text-green-700 border border-green-200`;
            case 'error':
                 // Sitenizin hata rengi
                return `${base} bg-red-100 text-red-700 border border-red-200`;
            default:
                 // Sitenizin bilgi rengi (Primary Color ile uyumlu)
                return `${base} bg-indigo-100 text-indigo-700 border border-indigo-200`;
        }
    };


    return (
        <div className="font-sans antialiased bg-gray-50 min-h-screen">
            
            {/* 1. PageHeading Emülasyonu */}
            <PageHeadingEmulator
                title="Arka Plan Düzenleme Aracı"
                bgSrc="https://placehold.co/1200x300/4f46e5/ffffff?text=Grafik+Tasarım+Aracı" // Kullanıcının arka plan resmi "images/arka2.png" yerine placeholder
                pageLinkText="Yeni Web Aracımız"
            />
            
            {/* Spacing lg='150' md='80' emülasyonu */}
            <div className="pt-24 md:pt-40"></div>
            
            {/* 2. Ana İçerik Konteyneri (Div className='cs-shape_wrap_4' ve Div className="container" emülasyonu) */}
            <div className="relative z-10"> 
                {/* Sitenizin özel şekil veya dekoratif arka planı buraya gelecektir. */}
                {/* <div className="absolute inset-0 bg-white shadow-xl"></div> */}

                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="row"> {/* Sitenizin Row yapısı */}
                        <div className="col-xl-4 w-full lg:w-1/3 pr-4"> {/* SectionHeading alanı emülasyonu */}
                            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 leading-tight">
                                Görselinizi Yükleyin ve İstenen Arka Planı Anında Oluşturun
                            </h2>
                            <div className="h-10"></div> {/* Spacing lg='90' md='45' emülasyonu */}
                        </div>

                        <div className="col-xl-8 w-full lg:w-2/3 pl-4"> {/* Ana Araç Alanı */}
                            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200">
                                
                                <h3 className="text-xl font-semibold mb-6 text-gray-800">Düzenleme Kontrolleri</h3>

                                {/* Etkileşim Alanı */}
                                <div className="flex flex-col md:flex-row gap-4 mb-6 items-end">
                                    {/* Dosya Yükleme */}
                                    <div className="flex-1 w-full">
                                        <label className="block mb-2 text-sm font-medium text-gray-600">1. Görsel Yükle (PNG/JPG)</label>
                                        <input 
                                            type="file" 
                                            accept="image/*" 
                                            onChange={handleImageUpload} 
                                            className="w-full border border-gray-300 rounded-lg p-2.5 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100 transition duration-150"
                                        />
                                    </div>

                                    {/* İstek Metni */}
                                    <div className="flex-1 w-full">
                                        <label className="block mb-2 text-sm font-medium text-gray-600">2. Düzenleme İsteği (Prompt)</label>
                                        <input 
                                            type="text" 
                                            placeholder="Örn: Arka planı bembeyaz yap" 
                                            value={prompt}
                                            onChange={(e) => setPrompt(e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                        />
                                    </div>

                                    {/* İşlem Butonu */}
                                    <div className="w-full md:w-auto">
                                        <button 
                                            onClick={processImage}
                                            disabled={!base64ImageData || isLoading}
                                            className={`w-full px-6 py-2.5 font-semibold rounded-lg transition duration-150 flex items-center justify-center ${
                                                !base64ImageData || isLoading
                                                    ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                                                    : `bg-${PRIMARY_COLOR} hover:bg-${SECONDARY_COLOR} text-white shadow-lg shadow-indigo-200`
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
                                        <h4 className="text-md font-medium text-gray-700 mb-3">Orijinal Görsel</h4>
                                        <div className="w-full h-80 bg-gray-100 rounded-lg flex justify-center items-center p-2 border-dashed border-2 border-gray-300">
                                            <img 
                                                src={base64ImageData || 'https://placehold.co/300x300/e0e0e0/505050?text=Görsel+Yükle'}
                                                alt="Orijinal Görsel Önizlemesi" 
                                                className="max-h-full max-w-full object-contain rounded-md shadow-md" 
                                            />
                                        </div>
                                    </div>

                                    {/* İşlenmiş Görsel */}
                                    <div className="flex flex-col items-center">
                                        <h4 className="text-md font-medium text-gray-700 mb-3">İşlenmiş Görsel</h4>
                                        <div className="w-full h-80 bg-gray-100 rounded-lg flex justify-center items-center p-2 border-dashed border-2 border-gray-300 relative">
                                            {/* Transparan arka plan deseni için (opsiyonel) */}
                                            <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'repeating-checkered'}}></div>
                                            <img 
                                                src={processedImageUrl || 'https://placehold.co/300x300/e0e0e0/505050?text=Sonuç+Burada+Görünecek'} 
                                                alt="İşlenmiş Görsel Önizlemesi" 
                                                className="max-h-full max-w-full object-contain rounded-md relative z-10 shadow-md"
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
                    className={`p-8 md:p-12 rounded-2xl flex flex-col md:flex-row justify-between items-center text-white bg-${PRIMARY_COLOR} shadow-xl`}
                    style={{ backgroundImage: 'url(/images/ctabg.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-0 leading-tight">
                        Markanızı bizimle <br />büyütmeye ne dersiniz?
                    </h2>
                    <a href="/iletisim" className={`px-8 py-3 bg-white text-${PRIMARY_COLOR} font-semibold rounded-lg hover:bg-gray-100 transition duration-300 shadow-md`}>
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
    /* Şeffaflık deseni (opsiyonel) */
    .repeating-checkered {
        background-color: #eee;
        background-image: linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc),
                          linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc);
        background-size: 10px 10px;
        background-position: 0 0, 5px 5px;
    }
`;

// Stilleri sayfaya ekle
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
