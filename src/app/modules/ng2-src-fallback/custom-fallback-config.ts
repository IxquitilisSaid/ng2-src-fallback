export type FallbackMimeType = 'jpeg' | 'png';


export interface ICustomFallbackConfig {
	height: string;
	width: string;
	bgColour: string;
	textSizeAndFont: string;
	textColour: string;
	textContent: string;
	textAlign: CanvasTextAlign;
	textBaseline: CanvasTextBaseline;
	mimeType: FallbackMimeType;
}
