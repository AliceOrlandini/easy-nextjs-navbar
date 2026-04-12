.PHONY: dev build release-patch release-minor release-major

dev:
	pnpm dev

build:
	pnpm build

release-patch:
	npm version patch
	git push origin main --tags

release-minor:
	npm version minor
	git push origin main --tags

release-major:
	npm version major
	git push origin main --tags
