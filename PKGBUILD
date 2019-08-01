pkgname=lightdm-webkit2-theme-iskra
_pkgname=iskra
pkgver=v1.1.2.r65.c3de83e
pkgrel=1
pkgdesc="A beautiful and simple lockscreen for LightDM made with React"
arch=('any')
url="https://github.com/felipemarinho97/iskra-webkit-greeter"
license=('MIT')
groups=()
depends=('lightdm' 'lightdm-webkit2-greeter')
makedepends=('git' 'npm') # 'bzr', 'git', 'mercurial' or 'subversion'
provides=("${pkgname%-git}")
replaces=("${pkgname%-git}")
source=("${pkgname}::git+https://github.com/felipemarinho97/iskra-webkit-greeter")
md5sums=('SKIP')

pkgver() {
	cd "$srcdir/${pkgname%-git}"
	printf "%s" "$(git describe --tag | sed 's/\([^-]*-\)g/r\1/;s/-/./g')"
}

build() {
	cd "$srcdir/${pkgname%-git}"
	npm install
	./build.sh
}

package() {
	install -dm755 "$pkgdir/usr/share/lightdm-webkit/themes/$_pkgname"
	cp -r "$srcdir/${pkgname}/"* "$pkgdir/usr/share/lightdm-webkit/themes/$_pkgname"
}
