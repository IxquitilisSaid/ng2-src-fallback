import {Component} from "@angular/core";
import {ICustomFallbackConfig} from './modules/ng2-src-fallback/custom-fallback-config';

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})

export class AppComponent {
	public fallbackImgURL: string = 'https://via.placeholder.com/200';
	public customFallbackConfig: ICustomFallbackConfig = {
		height: '200px',
		width: '200px',
		bgColour: 'black',
		textSizeAndFont: '20px sans-serif',
		textColour: 'white',
		textContent: '200x200',
		textAlign: 'center',
		textBaseline: 'middle',
		mimeType: 'jpeg'
	};

	constructor() {
	}
}
