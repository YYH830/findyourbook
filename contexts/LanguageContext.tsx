import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'zh';

interface Translations {
  subtitle: string;
  placeholder: string;
  search: string;
  searching: string;
  smartSearch: string;
  smartSearchDesc: string;
  directAccess: string;
  directAccessDesc: string;
  legalSources: string;
  legalSourcesDesc: string;
  noResults: string;
  tryChecking: string;
  foundVia: string;
  downloadView: string;
  footer: string;
  error: string;
  toggleBtn: string;
}

const translations: Record<Language, Translations> = {
  en: {
    subtitle: "Instantly find downloadable ebooks, PDFs, and open-access documents from libraries and archives across the web.",
    placeholder: "Search for an ebook (e.g., 'Pride and Prejudice', 'Learn React')...",
    search: "Search",
    searching: "Searching",
    smartSearch: "Smart Search",
    smartSearchDesc: "Our AI scans the web for the most relevant file repositories.",
    directAccess: "Direct Access",
    directAccessDesc: "We try to link directly to PDF or download pages when available.",
    legalSources: "Legal Sources",
    legalSourcesDesc: "Prioritizes open libraries like Project Gutenberg and Internet Archive.",
    noResults: "No results found for",
    tryChecking: "Try checking the spelling or searching for a different book.",
    foundVia: "Found via Web Search",
    downloadView: "Download / View",
    footer: "Links are provided by search engines. Please ensure compliance with copyright laws in your region.",
    error: "We encountered an issue connecting to the library database. Please try again later.",
    toggleBtn: "中文"
  },
  zh: {
    subtitle: "快速查找网络上的电子书、PDF和开放获取文档。",
    placeholder: "搜索电子书 (例如: '三体', 'React 教程')...",
    search: "搜索",
    searching: "搜索中",
    smartSearch: "智能搜索",
    smartSearchDesc: "AI 自动扫描网络寻找最相关的资源库。",
    directAccess: "直接访问",
    directAccessDesc: "尽可能直接链接到 PDF 或下载页面。",
    legalSources: "合法来源",
    legalSourcesDesc: "优先展示古登堡计划、互联网档案馆等合法来源。",
    noResults: "未找到结果：",
    tryChecking: "请检查拼写或尝试其他关键词。",
    foundVia: "来自网络搜索",
    downloadView: "下载 / 查看",
    footer: "链接由搜索引擎提供。请确保遵守当地版权法律。",
    error: "连接图书馆数据库时出现问题。请稍后再试。",
    toggleBtn: "English"
  }
};

interface LanguageContextType {
  language: Language;
  t: Translations;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'zh' : 'en'));
  };

  return (
    <LanguageContext.Provider value={{ language, t: translations[language], toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};