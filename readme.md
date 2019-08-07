# Cleaner (CICP Plugin)

This CICP plugin allows you to clean a recordset by deleting the duplicate entries.  
This could have been done either in `configLoader` or `recorder` but I decided to not do it for personnal reason.


# How to use it

## Add it to CICP

Install it to your `plugins` folder, then do not forget to add it while launching the cli: `cicp -o configLoader,matcher,cleaner`.   

## Require this plugin from another

Simply add the following object in your `package.json`:

```json
"plugin": {
  "consumes": [
    "cleaner",
  ],
}
```

## Comandline option

This plugin add a new commandline switch `-pc` or `--plug-cleaner`.  
It accept one parameter `recordset`.

Here is an example:  
`cicp --plug-cleaner 'recordset'`.

# Additional Informations

This plugin will generate another recordset with a suffix of `-Cleaned`.

This module use `DEBUG` so feel free to add `DEBUG=cicp:cleaner` to see debug logs.

# License

```
Copyright (c) 2019 Rémy Boulanouar

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:



The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.



THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```