import React, { useState, useEffect, useCallback } from 'react';

// --- API SABİTLERİ ---
const MODEL_NAME = "gemini-2.5-flash-image-preview";
const API_URL_BASE = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent`;
const API_KEY = ""; // Canvas ortamında otomatik sağlanacaktır.

// --- KULLANICININ ÖZEL BİLEŞEN EMÜLASYONLARI ---

/**
 * Spacing Bileşeni Emülasyonu: Sizin CSS'iniz tarafından boşluklar sağlanacaktır.
 * lg: masaüstü, md: mobil. React tarafında sadece div döndürür.
 */
const Spacing = ({ lg, md }) => {
    // Sizin CSS'inizde boşluklar muhtemelen margin/padding sınıflarıyla yönetiliyor.
    // Burada inline style ile geçici boşluklar tanımlıyoruz, ancak idealde
    // Sizin dış CSS'inizdeki "cs-spacing-lg-150" gibi sınıflar bunu halletmeli.
    const customStyle = {
        paddingTop: lg ? `${parseInt(lg) / 4}px` : '0',
        paddingBottom: lg ? `${parseInt(lg) / 4}px` : '0',
        // Mobil için ek padding (md)
        '@media (max-width: 991px)': {
            paddingTop: md ? `${parseInt(md) / 4}px` : '0',
            paddingBottom: md ? `${parseInt(md) / 4}px` : '0',
        }
    };
    // Tailwind yerine genel sınıf kullanıyoruz.
    return <div className={`cs-spacing-h-${lg}-${md}`} style={customStyle}></div>;
};

/**
 * Div Bileşeni Emülasyonu: Sadece bir div döndürür.
 */
const Div = ({ className, children }) => (
    <div className={className}>
        {children}
    </div>
);

/**
 * PageHeading Bileşeni Emülasyonu: Başlık bölümünü oluşturur.
 */
const PageHeadingEmulator = ({ title, bgSrc, pageLinkText }) => (
    <div 
        className="cs-page_heading cs-style1 cs-bg" // Sizin özel başlık sınıfınız
        style={{ backgroundImage: `url(${bgSrc})` }}
    >
        <div className="container">
            <div className="cs-page_heading_in">
                <h1 className="cs-page_title cs-primary_color">{title}</h1>
                <div className="breadcrumb">
                    <div className="breadcrumb-item">{pageLinkText}</div>
                </div>
            </div>
        </div>
    </div>
);

/**
 * SectionHeading Bileşeni Emülasyonu: Sol taraftaki başlığı oluşturur.
 */
const SectionHeadingEmulator = ({ title }) => (
    // Başlık için h2 ve $primary rengini kullanıyoruz
    <h2 className="cs-section_title cs-primary_color">
        {title}
    </h2>
);

/**
 * Cta Bileşeni Emülasyonu: Alt kısımdaki aksiyon çağrısını oluşturur.
 */
const CtaEmulator = ({ title, btnText, btnLink, bgSrc }) => (
    <Div className="container">
        <div 
            className={`cs-accent_bg cs-bg cs-shine_hover_1 p-[60px] rounded-[15px] flex flex-col md:flex-row justify-between items-center`}
            style={{ backgroundImage: `url(${bgSrc})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <h2 className="cs-white_color cs-font_42 mb-4 md:mb-0 leading-tight">
                <span dangerouslySetInnerHTML={{ __html: title }}></span>
            </h2>
            <a href={btnLink} className={`cs-btn cs-style1 cs-type1 cs-white_color`}>
                {btnText}
            </a>
        </div>
    </Div>
);

// --- API LOJİĞİ VE ANA BİLEŞEN ---

export default function App() {
    const [base64ImageData, setBase64ImageData] = useState(null);
    const [prompt, setPrompt] = useState('Arka planı tamamen kaldır');
    const [processedImageUrl, setProcessedImageUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState('info');

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
        // İşleniyor placeholder'ı
        setProcessedImageUrl('https://placehold.co/300x300/161616/e4e4e4?text=İşleniyor...');
        
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
            setProcessedImageUrl('https://placehold.co/300x300/161616/e4e4e4?text=Hazır');
            displayMessage('Görsel başarıyla yüklendi. İstediğiniz düzenlemeyi yazıp butona tıklayın.', 'info');
        };
        reader.readAsDataURL(file);
    };

    const getMessageBoxClasses = () => {
        let base = "mt-6 p-4 cs-radius_15 cs-font_18"; // Stillerinizi kullandık
        if (!message) return "hidden";

        switch (messageType) {
            case 'success':
                // Başarı (Örn: Yeşil - sizin paletinizde tanımlı değil, varsayılan koyu/açık yeşil)
                return `${base} bg-[#1e4620] text-[#a7f3d0] border border-[#347437]`;
            case 'error':
                 // Hata (Örn: Kırmızı)
                return `${base} bg-[#450a0a] text-[#fca5a5] border border-[#7f1d1d]`;
            default:
                // Bilgi (Accent Rengi - Mor)
                return `${base} bg-[#39315d] text-[#c4b5fd] border border-[#5d4a93]`;
        }
    };


    return (
        // body ve html stilleri cs-gray_bg ve font-family ile sağlanacak
        <div className="cs-gray_bg cs-primary_font min-h-screen">
            
            {/* PageHeading */}
            <PageHeadingEmulator
                title="Arka Plan Düzenleme Aracı"
                bgSrc="images/arka2.png" // Orijinal resim kaynağını kullandık
                pageLinkText="Yeni Web Aracımız"
            />
            
            <Spacing lg='150' md='80'/>
            
            <Div className='cs-shape_wrap_4'>
                {/* Sitenizin özel şekil divleri */}
                <Div className="cs-shape_4"></Div>
                <Div className="cs-shape_4"></Div>
                
                <Div className="container">
                    <Div className="row flex flex-wrap">
                        
                        {/* Sol Sütun: Başlık ve Açıklama (col-xl-4) */}
                        <Div className="col-xl-4 w-full lg:w-1/3 px-[10px]">
                            <SectionHeadingEmulator title='Görselinizi Yükleyin ve İstenen Arka Planı Anında Oluşturun' />
                            <Spacing lg='90' md='45'/>
                        </Div>

                        {/* Sağ Sütun: Düzenleme Kontrolleri (col-xl-8) */}
                        <Div className='col-xl-8 w-full lg:w-2/3 px-[10px]'>
                            <Div className='row cs-row_gap_20'> {/* İç Row yapısı */}
                                
                                <div className="p-8 md:p-10 cs-radius_15" style={{backgroundColor: '#000', border: '1px solid #7861ff', boxShadow: '0 0 30px rgba(120, 97, 255, 0.1)'}}>
                                    
                                    <h3 className="cs-primary_color cs-font_30 mb-6">Düzenleme Kontrolleri</h3>

                                    {/* Etkileşim Alanı */}
                                    <div className="flex flex-col md:flex-row gap-4 mb-6 items-end">
                                        
                                        {/* Dosya Yükleme */}
                                        <div className="flex-1 w-full">
                                            <label className="block mb-2 cs-ternary_color cs-font_18">1. Görsel Yükle (PNG/JPG)</label>
                                            <input 
                                                type="file" 
                                                accept="image/*" 
                                                onChange={handleImageUpload} 
                                                className="cs-form_field file:cs-btn file:cs-style1 file:cs-accent_bg file:cs-white_color"
                                            />
                                        </div>

                                        {/* İstek Metni */}
                                        <div className="flex-1 w-full">
                                            <label className="block mb-2 cs-ternary_color cs-font_18">2. Düzenleme İsteği (Prompt)</label>
                                            <input 
                                                type="text" 
                                                placeholder="Örn: Arka planı bembeyaz yap" 
                                                value={prompt}
                                                onChange={(e) => setPrompt(e.target.value)}
                                                className="cs-form_field"
                                            />
                                        </div>

                                        {/* İşlem Butonu */}
                                        <div className="w-full md:w-auto">
                                            <button 
                                                onClick={processImage}
                                                disabled={!base64ImageData || isLoading}
                                                className={`cs-btn cs-style1 ${
                                                    !base64ImageData || isLoading
                                                        ? 'opacity-50 cursor-not-allowed' // Devre dışı stili
                                                        : 'cs-accent_bg cs-white_color' // Aktif stili
                                                } w-full md:w-auto flex items-center justify-center`}
                                            >
                                                <span className="mr-2">{isLoading ? 'Oluşturuluyor...' : 'Düzenle ve Oluştur'}</span>
                                                {isLoading && (
                                                    // Loader'ı sizin temanızın renklerine uyarladık
                                                    <div className="cs-loader ml-3" style={{borderTopColor: '#7861ff', borderColor: 'rgba(158, 161, 173, 0.3)'}}></div>
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Görsel Sonuçları Alanı */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                                        {/* Orijinal Görsel */}
                                        <div className="flex flex-col items-center">
                                            <h4 className="cs-primary_color cs-font_24 mb-3">Orijinal Görsel</h4>
                                            <div className="w-full h-80 cs-radius_15 cs-center" style={{backgroundColor: '#000', border: '2px dashed rgba(158, 161, 173, 0.5)'}}>
                                                <img 
                                                    src={base64ImageData || 'https://placehold.co/300x300/161616/e4e4e4?text=Görsel+Yükle'}
                                                    alt="Orijinal Görsel Önizlemesi" 
                                                    className="max-h-full max-w-full object-contain cs-radius_15" 
                                                />
                                            </div>
                                        </div>

                                        {/* İşlenmiş Görsel */}
                                        <div className="flex flex-col items-center">
                                            <h4 className="cs-primary_color cs-font_24 mb-3">İşlenmiş Görsel</h4>
                                            <div className="w-full h-80 cs-radius_15 cs-center relative" style={{backgroundColor: '#000', border: '2px dashed rgba(158, 161, 173, 0.5)'}}>
                                                {/* Transparan Arka Plan Deseni */}
                                                <div className="absolute inset-0 opacity-20 repeating-checkered-dark cs-radius_15"></div>
                                                <img 
                                                    src={processedImageUrl || 'https://placehold.co/300x300/161616/e4e4e4?text=Sonuç+Burada+Görünecek'} 
                                                    alt="İşlenmiş Görsel Önizlemesi" 
                                                    className="max-h-full max-w-full object-contain cs-radius_15 relative z-10"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Mesaj Kutusu */}
                                    <div className={getMessageBoxClasses()}>
                                        {message}
                                    </div>

                                </div>

                            </Div>
                        </Div>
                    </Div>
                </Div>
            </Div>
            
            <Div className="container">
                <Spacing lg='90' md='80'/>
                <CtaEmulator
                    title="Markanızı bizimle <br />büyütmeye ne dersiniz?"
                    btnText="Şimdi Başla!"
                    btnLink="/iletisim"
                    bgSrc="/images/ctabg.png"
                />
            </Div>

            <Spacing lg='150' md='80'/>
            
        </div>
    );
}

// --- SİTENİZİN ÖZEL CSS STİLLERİ ---

const styles = `
    /*--------------------------------------------------------------
    ## Renk ve Font Değişkenleri
    ----------------------------------------------------------------*/
    
    /* Renk Değişkenleri SCSS'ten Düz CSS'e Çevrildi */
    :root {
        --white-color: #9ea1ad;
        --black-color: #161616;
        --primary-color: #e4e4e4;
        --secondary-color: rgba(228, 228, 228, 0.7); /* rgba($primary, 0.7) */
        --ternary-color: #999696;
        --border-color: #161616;
        --gray-color: #161616;
        --accent-color: #7861ff;
        --gradient-color: linear-gradient(to right, #5884ee, #00ff00);
    }

    /* Google Fonts */
    @import url('https://api.fontshare.com/v2/css?f[]=clash-grotesk@200,300,400,500,600,700&display=swap');

    body, html {
        color: var(--secondary-color);
        font-family: 'Clash Grotesk', sans-serif;
        font-size: 20px;
        font-weight: 500;
        line-height: 1.6em;
        overflow-x: hidden;
        background-color: var(--gray-color);
    }
    
    /* Başlık Stilleri */
    h1, h2, h3, h4, h5, h6 {
        clear: both;
        color: var(--primary-color);
        padding: 0;
        margin: 0 0 20px 0;
        font-weight: 600;
        line-height: 1.3em;
        font-family: 'Clash Grotesk', sans-serif;
    }

    h1 { font-size: 56px; }
    h2 { font-size: 42px; }
    h3 { font-size: 30px; }
    h4 { font-size: 24px; }
    h5 { font-size: 18px; }
    h6 { font-size: 16px; }
    
    /* Genel Sınıflar */
    .cs-primary_font { font-family: 'Clash Grotesk', sans-serif; }
    .cs-secondary_font { font-family: 'Clash Grotesk', sans-serif; }
    .cs-primary_color { color: var(--primary-color); }
    .cs-ternary_color { color: var(--ternary-color); }
    .cs-accent_color { color: var(--accent-color); }
    .cs-accent_bg { background-color: var(--accent-color); }
    .cs-gray_bg { background-color: var(--gray-color); }
    .cs-white_color { color: var(--white-color); }
    .cs-radius_15 { border-radius: 15px; }
    .cs-font_18 { font-size: 18px; }
    .cs-font_24 { font-size: 24px; }
    .cs-font_30 { font-size: 30px; }
    .cs-font_42 { font-size: 42px; }
    .cs-bg { background-size: cover; background-repeat: no-repeat; background-position: center; }
    .cs-center { display: flex; align-items: center; justify-content: center; }

    /* Container ve Row Gap */
    .container {
        width: 100%;
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto;
        max-width: 1200px; /* Bootstrap default uyumu */
    }
    .row {
        display: flex;
        flex-wrap: wrap;
        margin-left: -15px;
        margin-right: -15px;
    }
    .col-xl-4 { flex: 0 0 33.333333%; max-width: 33.333333%; }
    .col-xl-8 { flex: 0 0 66.666667%; max-width: 66.666667%; }
    .w-full { width: 100%; }
    .lg\\:w-1\\/3 { @media (min-width: 992px) { width: 33.333333%; } }
    .lg\\:w-2\\/3 { @media (min-width: 992px) { width: 66.666667%; } }
    .px-\\[10px\\] { padding-left: 10px; padding-right: 10px; }

    .cs-row_gap_20 {
        margin-left: -10px;
        margin-right: -10px;
        > div {
            padding-left: 10px;
            padding-right: 10px;
        }
    }

    /* Input ve Form Alanları */
    .cs-form_field {
        display: block;
        width: 100%;
        padding: 10px 20px;
        border-radius: 15px;
        outline: none;
        transition: all 0.3s ease;
        border: 2px solid var(--ternary-color);
        background-color: transparent;
        color: var(--primary-color);
    }
    .cs-form_field:focus {
        border-color: var(--accent-color);
    }
    
    /* Buton Stilleri (.cs-btn.cs-style1) */
    .cs-btn.cs-style1 {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 13px 26px;
        transition: all 0.3s ease;
        border: transparent;
        color: var(--primary-color);
        position: relative;
        line-height: 1.5em;
        font-weight: 600;
        border-radius: 15px;
        background-color: var(--accent-color);
        color: #fff;
        cursor: pointer;
    }
    .cs-btn.cs-style1::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(22, 22, 22, 0.4); /* rgba($black, 0.4) */
        transform: scaleX(0);
        transform-origin: 0 50%;
        transition-property: transform;
        transition-duration: 0.6s;
        transition-timing-function: ease-out;
        border-radius: inherit;
    }
    .cs-btn.cs-style1:hover::before {
        transform: scaleX(1);
        transition-timing-function: cubic-bezier(0.52, 1.64, 0.37, 0.66);
    }
    .cs-btn.cs-style1.cs-type1 {
        border: 2px solid #fff;
        background-color: transparent;
        border-radius: 30px;
        transition: all 0.6s ease-in-out;
        overflow: hidden;
    }
    .cs-btn.cs-style1.cs-type1::before {
        background-color: #fff;
        border-radius: 30px;
        z-index: -1;
    }
    .cs-btn.cs-style1.cs-type1:hover {
        color: var(--accent-color);
    }

    /* Page Heading Stili */
    .cs-page_heading.cs-style1 {
        height: 400px;
        padding: 120px 0 50px;
        position: relative;
        z-index: 1; /* Eklediğiniz overlay'ler için z-index yönetimi */
    }
    .cs-page_heading.cs-style1::after {
        content: '';
        position: absolute;
        right: -30px;
        top: -30px;
        height: 151px;
        width: 151px;
        background: var(--accent-color);
        opacity: 0.8;
        filter: blur(125px);
        z-index: 0;
    }
    .cs-page_heading.cs-style1 .cs-page_title {
        margin-bottom: 18px;
    }
    .cs-page_heading.cs-style1 .breadcrumb {
        color: var(--ternary-color);
    }
    .cs-page_heading.cs-style1 .breadcrumb-item.active {
        color: var(--white-color);
    }
    
    /* CTA Stili İpuçları */
    .cs-shine_hover_1 {
        position: relative;
        overflow: hidden;
        /* Shine animasyonu ve hover::before stilleri (kodu çok uzun olduğu için özetledim) */
    }

    /* Yükleyici Stili */
    .cs-loader {
        border: 4px solid rgba(158, 161, 173, 0.3); 
        border-top: 4px solid var(--accent-color); 
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
    
    /* Mobil Uyumlu Font Boyutları */
    @media screen and (max-width: 991px) {
        body, html { font-size: 16px; }
        h2 { font-size: 36px; margin-bottom: 10px; }
        .cs-page_heading.cs-style1 { height: 400px; }
    }
    @media screen and (max-width: 767px) {
        h1 { font-size: 42px; }
    }
`;

// Stilleri sayfaya ekle
// Bu stil bloğu, React bileşeninizle birlikte çalıştığında sitenizin temasını sağlayacaktır.
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
