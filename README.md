# evitasimaresi.github.io
my portfolio


## Prerequisites
In the current project jekyll library is utilized to create layouts for the static website.
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

    or the following for the production enviroment, analytics will work with this build
    ``` bash
    JEKYLL_ENV=production jekyll build
    ```
1. Run a local web server, by append --livereload the browser will refresh with every change
    ``` bash
    jekyll serve --livereload
    ```

    * Actually the following command refresh the content when there is change.
        ``` bash
        jekyll serve --force_polling
        ```
        