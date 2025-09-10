# Tauri desktop apps

	cargo install tauri-cli
	npx create-tauri-app MY-TAURI-APP

To get started run:
	cd MY-TAURI-APP
	npm install

For Desktop development, run:
	npm run tauri dev

## Problems with Tauri CLI installation

	rustup install nightly
	rustup override set nightly
	cargo install tauri-cli

## Android and iOS

For Android development, run:
	npm run tauri android init
	npm run tauri android dev

For iOS development, run:
	npm run tauri ios init
	npm run tauri ios dev


## Tasks

### App icon

https://v1.tauri.app/v1/guides/features/icons/

	npm run tauri icon [./app-icon.png]

### Environment (.env)

	const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
