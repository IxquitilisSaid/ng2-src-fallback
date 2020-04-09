import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})

export class AppComponent implements OnInit {
	private _ctx: CanvasRenderingContext2D;

	public title = "ng2-src-fallback";
	public placeholderText = '300x150';
	public placeholderBgColour = 'black';
	public placeholderTextColour = 'white';
	public placeholderMimeType = 'jpeg';
	public fallbackImgURL: string;

	@ViewChild('canvas', {static: true}) canvas: ElementRef<HTMLCanvasElement>;

	constructor() {
	}

	ngOnInit() {
		this._ctx = this.canvas.nativeElement.getContext('2d');

		this._ctx.fillStyle = this.placeholderBgColour;
		this._ctx.fillRect(
			0, 0,
			this.canvas.nativeElement.width,
			this.canvas.nativeElement.height
		);

		this._ctx.font = '20px sans-serif';
		this._ctx.textAlign = 'center';
		this._ctx.textBaseline = 'middle';

		this._ctx.fillStyle = this.placeholderTextColour;
		this._ctx.fillText(
			this.placeholderText,
			this.canvas.nativeElement.width / 2,
			this.canvas.nativeElement.height / 2
		);

		this.generateFallback();
	}

	public generateFallback() {
		this.fallbackImgURL = this.canvas.nativeElement
			.toDataURL(`image/${this.placeholderMimeType}`);
	}
}
