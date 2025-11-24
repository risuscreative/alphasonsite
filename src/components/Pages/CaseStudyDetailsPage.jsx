import React, { useState, useEffect, useCallback } from 'react';

// --- API SABİTLERİ ---
const MODEL_NAME = "gemini-2.5-flash-image-preview";
const API_URL_BASE = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent`;
const API_KEY = ""; // Canvas ortamında otomatik sağlanacaktır.

// --- BİLEŞENLER ---

/**
 * Header (Navigasyon) Emülasyonu
 * Attığın resimdeki (resim.jpg) yapıyı taklit eder.
 */
const HeaderEmulator = () => (
    <header className="cs-site_header cs-style1 cs-sticky_header">
        <div className="cs-main_header">
            <div className="container">
                <div className="cs-main_header_in">
                    {/* Sol: Logo */}
                    <div className="cs-main_header_left">
                        <a className="cs-site_branding" href="#">
                            {/* Logo Placeholder - Sitenizin logosunu temsil eder */}
                            <div className="flex items-center">
                                <span className="cs-font_30 cs-bold cs-white_color">alpha</span>
                                <span className="cs-font_18 cs-white_color ml-2" style={{opacity: 0.7}}>artworks</span>
                            </div>
                        </a>
                    </div>

                    {/* Orta: Menü */}
                    <div className="cs-main_header_center">
                        <div className="cs-nav">
                            <ul className="cs-nav_list">
                                <li><a href="#" className="cs-active">Ana Sayfa</a></li>
                                <li><a href="#">Tasarımlarımız</a></li>
                                <li><a href="#">Hizmetlerimiz</a></li>
                                <li><a href="#">Blog</a></li>
                                <li><a href="#">İletişim</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Sağ: İkonlar */}
                    <div className="cs-main_header_right">
                        <div className="cs-toolbox">
                            <span className="cs-icon_btn">S</span>
                            <span className="cs-icon_btn">fi</span>
                            <span className="cs-icon_btn">bi</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
);

/**
 * Spacing Bileşeni
 */
const Spacing = ({ lg, md }) => {
    const customStyle = {
        height: lg ? `${parseInt(lg)}px` : '0',
    };
    return <div className="cs-spacing" style={customStyle}></div>;
};

/**
 * Div Bileşeni
 */
const Div = ({ className, children }) => (
    <div className={className}>
        {children}
    </div>
);

/**
 * SectionHeading Bileşeni
 */
const SectionHeadingEmulator = ({ title }) => (
    <h2 className="cs-section_title cs-primary_color">
        {title}
    </h2>
);

// --- ANA UYGULAMA ---

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
                    if (i === maxRetries - 1) throw new Error("API hatası.");
                    const delay = Math.pow(2, i) * 1000 + Math.floor(Math.random() * 1000);
                    await new Promise(resolve => setTimeout(resolve, delay));
                    continue;
                }
                if (!response.ok) throw new Error(`API Hatası: ${response.status}`);
                return response.json();
            } catch (error) {
                if (i === maxRetries - 1) throw error;
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
    }, []);

    const processImage = useCallback(async () => {
        if (!base64ImageData || isLoading) return;
        setIsLoading(true);
        setProcessedImageUrl('https://placehold.co/300x300/161616/e4e4e4?text=İşleniyor...');
        
        if (!prompt) {
            setIsLoading(false);
            displayMessage('Lütfen bir istek girin.', 'error');
            return;
        }

        const payload = {
            contents: [{ parts: [{ text: prompt }, { inlineData: { mimeType: 'image/png', data: base64ImageData.split(',')[1] } }] }],
            generationConfig: { responseModalities: ['TEXT', 'IMAGE'] },
        };

        try {
            const result = await fetchWithExponentialBackoff(`${API_URL_BASE}?key=${API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const base64Data = result?.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData?.data;
            if (!base64Data) throw new Error("Görsel oluşturulamadı.");

            setProcessedImageUrl(`data:image/png;base64,${base64Data}`);
            displayMessage('Başarılı!', 'success');
        } catch (error) {
            setProcessedImageUrl('https://placehold.co/300x300/450a0a/fca5a5?text=Hata');
            displayMessage('Hata oluştu.', 'error');
        } finally {
            setIsLoading(false);
        }
    }, [base64ImageData, prompt, isLoading, fetchWithExponentialBackoff, displayMessage]);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            setBase64ImageData(e.target.result);
            setProcessedImageUrl('https://placehold.co/300x300/161616/e4e4e4?text=Hazır');
            displayMessage('Görsel yüklendi.', 'info');
        };
        reader.readAsDataURL(file);
    };

    const getMessageBoxClasses = () => {
        let base = "mt-6 p-4 cs-radius_15 cs-font_18";
        if (!message) return "hidden";
        if (messageType === 'success') return `${base} bg-[#1e4620] text-[#a7f3d0] border border-[#347437]`;
        if (messageType === 'error') return `${base} bg-[#450a0a] text-[#fca5a5] border border-[#7f1d1d]`;
        return `${base} bg-[#39315d] text-[#c4b5fd] border border-[#5d4a93]`;
    };

    return (
        <div className="cs-gray_bg cs-primary_font min-h-screen flex flex-col">
            
            {/* 1. Header (Navigasyon Menüsü) */}
            <HeaderEmulator />

            {/* 2. Sayfa Başlığı (Page Heading) */}
            {/* Header fixed olduğu için padding-top ekleyerek içeriği aşağı itiyoruz */}
            <div className="cs-page_heading cs-style1 cs-bg" style={{ paddingTop: '200px', paddingBottom: '50px', backgroundImage: 'url(images/arka2.png)' }}>
                <div className="container">
                    <div className="cs-page_heading_in">
                        <h1 className="cs-page_title cs-white_color">Arka Plan Düzenleme Aracı</h1>
                        <div className="cs-breadcrumb cs-ternary_color">
                            <span>Ana Sayfa</span> / <span>Araçlar</span>
                        </div>
                    </div>
                </div>
            </div>

            <Spacing lg='100' md='50'/>
            
            <Div className='cs-shape_wrap_4'>
                <Div className="cs-shape_4"></Div>
                <Div className="cs-shape_4"></Div>
                
                <Div className="container">
                    <Div className="row flex flex-wrap">
                        {/* Sol Kolon */}
                        <Div className="col-xl-4 w-full lg:w-1/3 px-[10px] mb-10 lg:mb-0">
                            <SectionHeadingEmulator title='Görselinizi Yükleyin ve İstenen Arka Planı Anında Oluşturun' />
                            <p className="cs-ternary_color mt-4 cs-font_18">
                                Yapay zeka destekli aracımızla ürün fotoğraflarınızı veya portrelerinizi saniyeler içinde düzenleyin.
                            </p>
                        </Div>

                        {/* Sağ Kolon (Form Alanı) */}
                        <Div className="col-xl-8 w-full lg:w-2/3 px-[10px]">
                            <Div className='row cs-row_gap_20'>
                                <div className="p-8 md:p-10 cs-radius_15" style={{backgroundColor: '#080808', border: '1px solid #333'}}>
                                    
                                    <h3 className="cs-primary_color cs-font_30 mb-6">Düzenleme Paneli</h3>

                                    <div className="flex flex-col md:flex-row gap-6 mb-8 items-end">
                                        <div className="flex-1 w-full">
                                            <label className="block mb-2 cs-ternary_color cs-font_18">1. Görsel Seç</label>
                                            <input type="file" accept="image/*" onChange={handleImageUpload} className="cs-form_field"/>
                                        </div>
                                        <div className="flex-1 w-full">
                                            <label className="block mb-2 cs-ternary_color cs-font_18">2. İstek (Prompt)</label>
                                            <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} className="cs-form_field"/>
                                        </div>
                                        <div className="w-full md:w-auto">
                                            <button onClick={processImage} disabled={!base64ImageData || isLoading} className={`cs-btn cs-style1 ${!base64ImageData || isLoading ? 'opacity-50' : 'cs-accent_bg'} w-full md:w-auto flex justify-center`}>
                                                <span>{isLoading ? 'İşleniyor...' : 'Başla'}</span>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex flex-col items-center">
                                            <h4 className="cs-white_color cs-font_18 mb-3 opacity-70">Orijinal</h4>
                                            <div className="w-full h-64 cs-radius_15 cs-center bg-[#161616] border border-[#333]">
                                                <img src={base64ImageData || 'https://placehold.co/300x200/222/555?text=Resim+Yok'} className="max-h-full max-w-full object-contain cs-radius_15" />
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <h4 className="cs-white_color cs-font_18 mb-3 opacity-70">Sonuç</h4>
                                            <div className="w-full h-64 cs-radius_15 cs-center bg-[#161616] border border-[#333] relative">
                                                <div className="absolute inset-0 opacity-10 repeating-checkered-dark cs-radius_15"></div>
                                                <img src={processedImageUrl || 'https://placehold.co/300x200/222/555?text=Sonuç'} className="max-h-full max-w-full object-contain cs-radius_15 relative z-10" />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className={getMessageBoxClasses()}>{message}</div>
                                </div>
                            </Div>
                        </Div>
                    </Div>
                </Div>
            </Div>
            
            <Spacing lg='150' md='80'/>
        </div>
    );
}

// --- CSS ---
const styles = `
    /* Temel Değişkenler */
    :root {
        --primary-color: #e4e4e4;
        --secondary-color: rgba(228, 228, 228, 0.7);
        --accent-color: #7861ff;
        --gray-color: #161616;
        --border-color: #333;
    }
    @import url('https://api.fontshare.com/v2/css?f[]=clash-grotesk@200,300,400,500,600,700&display=swap');
    
    body, html { 
        background-color: var(--gray-color); 
        color: var(--secondary-color); 
        font-family: 'Clash Grotesk', sans-serif; 
        margin: 0; padding: 0;
    }

    /* Header Stilleri (Resim.jpg'den esinlenildi) */
    .cs-site_header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 100;
        background-color: rgba(22, 22, 22, 0.95); /* Hafif transparan siyah */
        backdrop-filter: blur(10px);
        border-bottom: 1px solid rgba(255,255,255,0.05);
        padding: 20px 0;
    }
    .cs-main_header_in {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 50px;
    }
    .cs-nav_list {
        display: flex;
        list-style: none;
        margin: 0; padding: 0;
    }
    .cs-nav_list li {
        margin: 0 20px;
    }
    .cs-nav_list a {
        color: #999;
        text-decoration: none;
        font-weight: 500;
        font-size: 16px;
        transition: color 0.3s;
    }
    .cs-nav_list a:hover, .cs-nav_list a.cs-active {
        color: var(--accent-color); /* Mor renk */
    }
    .cs-icon_btn {
        color: #fff;
        margin-left: 15px;
        font-weight: bold;
        opacity: 0.7;
        cursor: pointer;
    }
    .cs-icon_btn:hover { opacity: 1; color: var(--accent-color); }

    /* Genel Sınıflar */
    .container { max-width: 1200px; margin: 0 auto; padding: 0 15px; }
    .cs-primary_color { color: var(--primary-color); }
    .cs-white_color { color: #fff; }
    .cs-ternary_color { color: #999; }
    .cs-accent_bg { background-color: var(--accent-color); color: #fff; }
    .cs-radius_15 { border-radius: 15px; }
    .cs-font_18 { font-size: 18px; }
    .cs-font_30 { font-size: 30px; }
    .cs-btn {
        padding: 12px 30px; border-radius: 12px; font-weight: 600; cursor: pointer; transition: 0.3s;
    }
    .cs-btn:hover { transform: translateY(-2px); }
    .cs-form_field {
        width: 100%; background: transparent; border: 1px solid #444; color: #fff; padding: 12px; border-radius: 10px; outline: none;
    }
    .cs-form_field:focus { border-color: var(--accent-color); }

    /* Page Heading */
    .cs-page_heading {
        position: relative;
        overflow: hidden;
    }
    .cs-page_heading::after {
        content: '';
        position: absolute;
        top: 0; right: 0;
        width: 300px; height: 300px;
        background: var(--accent-color);
        filter: blur(150px);
        opacity: 0.2;
        z-index: 0;
        border-radius: 50%;
        transform: translate(30%, -30%);
    }

    /* Mobil Uyum */
    @media (max-width: 991px) {
        .cs-nav_list { display: none; } /* Mobilde menüyü gizle (basitlik için) */
        .cs-page_heading { padding-top: 120px !important; }
    }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
