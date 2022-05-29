# [Happy Modals](https://happymodals.com) &middot; [![GitHub license](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](/LICENSE) [![npm version](https://img.shields.io/npm/v/react.svg?style=flat)](https://www.npmjs.com/package/happymodals)

Happy Modals allows developers a stress-free experience of implementing modals (aka dialogs).

* **Barebones:** To minimize design influences, Happy Modals only considers the bare minimum user accessibility requirements. This leaves room for the develoepr and designer to get creative.* 
**Accessibility:** In addition to end-to-end Playwright tests, this package is also manually tested on all major devices against all major browser engines and major assistant technologies.
* **Dumb-Simple:** The most simple way to get started is creating an element with the class "modal-open" that is immediately preceeded by an element with the role="dialog" attribute.

[Learn how to use Happy Modals](https://happymodals.com/docs).

## Lite vs Standard version

The lite version has the most barebone features with the easiest setup and developer experience. All versions include
* custom modal backdrop
* custom open/close buttons
* automatic scroll-lock
* automatic backdrop/close buttons

Unlike the lite version, the standard version exposes granular controls over the modal, as well as more features. The only requirement being that you are using one of the compatible frameworks.
* dynamically render/import components
* lifecycle hooks (before/after open/close)
* exposes close function

## Installation

There is nothing out there (..yet) that gets any easier than this.

* Test out [examples](https://happymodals.com/docs/examples) to see how simple it is.
* [Add Happy Modals](https://happymodals.com/docs/install) in a few simple steps.
* See [how it works](https://happymodals.com/docs/howiw) behind the scenes.


## Documentation

Start now at [happymodals.com/docs](https://happymodals.com/docs)!

There are two different versions of Happy Modals, a lite version and a standard version. You can access any version of the documentation by the "version" toggle on the upper-right-hand corner of the website.

The documentation for each version is divided into 3 sections:
* [How it Works](https://happymodals.com/docs/howiw)
* [Examples](https://happymodals.com/docs/examples)
* [Installation](https://happymodals.com/docs/install)

You can improve it by sending pull requests to [the same repository](https://github.com/byjackli/happymodals).


## Contributing
Open to proposals with crazy changes, expect lengthy discussions. This is a relatively small project, so there are currently no strict templates and rules.

Just use the following keywords for their respective changes:
* `[DOCS]`
* `[PATCH]`
* `[UPDATE]`
* `[BREAKING]`

Note that official npm releases abide by [semantic versioning](https://semver.org/), see [changelog](./CHANGELOG.md) for the complete record.


### [Code of Conduct](./CODE_OF_CONDUCT.md)

Happy Modals has adopted a Code of Conduct that we expect project participants to adhere to. Please read [the full text](./CODE_OF_CONDUCT.md) so that you can understand what actions will and will not be tolerated.


### License

Happy Modals is [Apache 2.0 licensed](./LICENSE).