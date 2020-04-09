import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import {Ng2SrcFallbackModule} from './modules/ng2-src-fallback';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		Ng2SrcFallbackModule
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
