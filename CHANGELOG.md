## 0.2.0 (June 15, 2022)
This update brings a non-breakking new feature, introducing sticky option 

## New Features
* `sticky`: When set to true, the modal will stickk to the origin on scroll. The `fixed` value will be treated as offset from the origin.

## Upcoming
* `ModalStore.ts`: combine all track arrays (ie: trackOrigin, trackContainer, ...) into one single array of objects (ie: [{trackOrigin: #, trackContainer:#, ...}]). This upcoming change should save significant space.


<br/>


## 0.1.2 (June 4, 2022)
This update brings non-breaking bugfixes.

* Fixed a bug where custom coordinates is accidentally overwritten.


<br/>


## 0.1.1 (May 30, 2022)
This update brings non-breaking bugfixes.

* Fixed a bug where clicking on the toggle button of an open modal does not close the modal
* Fixed a bug causing raw modals to have unexpected behaviors when attempting to close


<br/>


## 0.1.0 (May 28, 2022)
This update introduces new non-breaking features, exposing greater control over the user interface and user experience.

### New Features
* `raw`: When set to true, the modal will not auto-create missing components (open modal button, close modal button, and backdrop). By default, this feature is turned off.
* `toggle`: When set to true, the open modal button acts as a toggle. By default, this feature is turned off.
* `fixed`: Manually set x and y coordinates of modal position (fixed={x:"99unit",y:"99unit"}). By default, this feature is disabled (set to undefined).


<br/>


## 0.0.2 (May 26, 2022)

* Add modal support for Svelte


<br/>



## 0.0.1 (April 23, 2022)

* Initial public release