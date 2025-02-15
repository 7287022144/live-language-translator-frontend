import React, { useState } from "react";
import axios from "axios";

const SpeechToTextApp = () => {
    const [text, setText] = useState(""); // Extracted text
    const [translatedText, setTranslatedText] = useState(""); // Translated text
    const [selectedLanguage, setSelectedLanguage] = useState("en"); // Default to English

    const translateText = async () => {
        if (!text) return;

        try {
            const response = await axios.post(
                "https://libretranslate.com/translate",
                {
                    q: text,
                    source: "auto", // Detects language automatically
                    target: selectedLanguage,
                    format: "text",
                },
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            setTranslatedText(response.data.translatedText);
        } catch (error) {
            console.error("Translation Error:", error);
        }
    };

    return (
        <div className="p-6 bg-gray-200 min-h-screen flex flex-col items-center">
            {/* Extracted Text Display */}
            <div className="w-full max-w-2xl p-4 bg-white shadow-lg rounded mb-4">
                <h2 className="text-xl font-bold mb-2">Extracted Text</h2>
                <textarea
                    className="w-full p-2 border"
                    rows="4"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>

            {/* Language Dropdown & Translate Button */}
            <div className="w-full max-w-2xl p-4 bg-gray-300 shadow-lg rounded mb-4 flex flex-col items-center">
                <label className="text-lg font-bold mb-2">Select Language:</label>
                <select
                    className="p-2 border rounded w-full max-w-xs"
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                >
                    <option value="en">English</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="es">Spanish</option>
                    <option value="hi">Hindi</option>
                    <option value="zh">Chinese</option>
                    <option value="ar">Arabic</option>
                </select>

                <button
                    onClick={translateText}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Translate
                </button>
            </div>

            {/* Translated Text Display (Now Below) */}
            <div className="w-full max-w-2xl p-4 bg-blue-100 shadow-lg rounded">
                <h2 className="text-xl font-bold mb-2">Translated Text</h2>
                <textarea className="w-full p-2 border" rows="4" value={translatedText} readOnly />
            </div>
        </div>
    );
};

export default SpeechToTextApp;
