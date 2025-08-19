
import { GoogleGenAI } from "@google/genai";
import type { WaterSystemData } from '../types';

if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const getWaterSystemAnalysis = async (data: WaterSystemData): Promise<string> => {
    if (!process.env.API_KEY) {
        return Promise.resolve(`
## AI Analysis Disabled
**Reason:** API key is not configured.

To enable this feature, please set the \`API_KEY\` environment variable. This would normally provide an AI-driven analysis of the current water system data, offering insights and recommendations.
        `);
    }

    const prompt = `
    As an expert facility management analyst, review the following water system data for Muscat Bay.

    Data:
    ${JSON.stringify(data, null, 2)}

    Provide a concise analysis in Markdown format. Your analysis should include:
    - A brief summary of the current situation.
    - Key insights and potential issues identified from the data.
    - Actionable recommendations for improvement or investigation.

    Structure your response with the following headings:
    - ## Summary
    - ## Key Insights
    - ## Recommendations
    
    Keep the language professional and clear. Focus on data-driven observations.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error fetching AI analysis:", error);
        return "## Error\n\nThere was an error generating the AI analysis. Please check the console for more details and ensure your API key is valid.";
    }
};
