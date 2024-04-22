# evitasimaresi.github.io
my portfolio


## Prerequisites
In the current project jekyll library is utilised to create layouts for the static website.
### Installation for jekyll
[Documentation available here](https://jekyllrb.com/docs/installation/)
1. Install Ruby by running:
    ``` bash
    sudo apt update
    sudo apt install ruby-full
    ```

1. Verify ruby installation
    ``` bash
    ruby -v
    ```

1. Install Jekyll, probably elevated permissions needed.
    ``` bash
    sudo gem install jekyll bundler
    ```

Ready to start using Jekyll, refer to the documentation (link above) for detailed instructions.

### Build jekyll
[Documentation available here](https://jekyllrb.com/docs/step-by-step/01-setup/)
> [!CAUTION]
>This method is shall not be used for deployment
1. Builds the site
    ``` bash
    jekyll build
    ```
1. Run a local web server, by append --livereload the browser will refersh with every change
    ``` bash
    jekyll serve --livereload
    ```