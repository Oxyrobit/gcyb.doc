// Serveur HTTP statique minimal pour le site Docusaurus construit.
//
// Compilé en binaire statique (CGO_ENABLED=0) et exécuté seul dans une image
// sans shell ni gestionnaire de paquets. Comportement repris de
// `docusaurus serve` :
//   - /chemin/ sert /chemin/index.html, /chemin redirige vers /chemin/ ;
//   - page 404.html (statut 404) pour tout fichier absent ;
//   - pas de listing de répertoire ;
//   - /assets/* (noms hachés) mis en cache longue durée.
package main

import (
	"flag"
	"log"
	"net/http"
	"os"
	"path"
	"strings"
	"time"
)

func main() {
	root := flag.String("root", "/site", "répertoire du site construit")
	addr := flag.String("addr", ":3000", "adresse d'écoute")
	flag.Parse()

	page404, err := os.ReadFile(path.Join(*root, "404.html"))
	if err != nil {
		log.Printf("404.html introuvable, page 404 texte : %v", err)
		page404 = []byte("404 page not found\n")
	}

	files := http.FileServer(http.Dir(*root))
	handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet && r.Method != http.MethodHead {
			w.Header().Set("Allow", "GET, HEAD")
			http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
			return
		}
		p := path.Clean("/" + r.URL.Path)
		if !exists(*root, p) {
			w.Header().Set("Content-Type", "text/html; charset=utf-8")
			w.WriteHeader(http.StatusNotFound)
			if r.Method == http.MethodGet {
				w.Write(page404)
			}
			return
		}
		if strings.HasPrefix(p, "/assets/") {
			w.Header().Set("Cache-Control", "public, max-age=31536000, immutable")
		}
		w.Header().Set("X-Content-Type-Options", "nosniff")
		files.ServeHTTP(w, r)
	})

	srv := &http.Server{
		Addr:              *addr,
		Handler:           handler,
		ReadHeaderTimeout: 10 * time.Second,
		ReadTimeout:       30 * time.Second,
		WriteTimeout:      60 * time.Second,
		IdleTimeout:       120 * time.Second,
	}
	log.Printf("site %s servi sur %s", *root, *addr)
	log.Fatal(srv.ListenAndServe())
}

// exists : fichier présent, ou répertoire contenant un index.html (on
// refuse ainsi les répertoires sans index, que FileServer listerait).
func exists(root, p string) bool {
	fi, err := os.Stat(path.Join(root, p))
	if err != nil {
		return false
	}
	if !fi.IsDir() {
		return true
	}
	_, err = os.Stat(path.Join(root, p, "index.html"))
	return err == nil
}
