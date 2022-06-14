<script lang="ts">
    import Card from "../../components/Card.svelte";
    import Note from "../../components/Note.svelte";
    import Modal from "$lib/components/Modal.svelte";
    import LiteModeSwitch from "../../components/LiteModeSwitch.svelte";

    export let isolated = true;
</script>

<section class="examples">
    {#if isolated}
        <h1 class="h3">Examples</h1>
    {:else}
        <h2 class="h3">Examples</h2>
    {/if}
    <p>
        Each category has at least one example, you are invited to try all of
        them!
    </p>
    <p>
        If you would like to improve or add an example, you can <a
            href="https://github.com/byjackli/happymodals"
            rel="noreferrer">fork this repo</a
        >!
    </p>
    <div class="card-container">
        <Card>
            <svelte:fragment slot="title">Basic</svelte:fragment>
            <svelte:fragment slot="desc">
                <p>
                    The most simple and easy way to create a modal, just an open
                    button and the actual dialog.
                </p>
            </svelte:fragment>
            <svelte:fragment slot="samples">
                <Modal>
                    <button slot="button">standard</button>
                    <div slot="modal">
                        <div class="container">
                            <h4>Things about this modal</h4>
                            <ol>
                                <li>✅ active modal</li>
                                <li>✅ layers of nested: 1/1</li>
                                <li>⬜ custom backdrop</li>
                                <li>⬜ custom close button</li>
                            </ol>
                            <h4 class="h5">dummy input fields</h4>
                            <div class="inputs">
                                <input type="text" placeholder="1" />
                                <input type="text" placeholder="2" />
                                <input type="text" placeholder="3" />
                                <input type="text" placeholder="4" />
                                <input type="text" placeholder="5" />
                                <input type="text" placeholder="6" />
                                <input type="text" placeholder="7" />
                                <input type="text" placeholder="8" />
                            </div>
                        </div>
                    </div>
                </Modal>
                <Modal>
                    <button slot="button">terms</button>
                    <div slot="modal">hello</div>
                </Modal>
            </svelte:fragment>
        </Card>
        <Card>
            <svelte:fragment slot="title">Custom Backdrop</svelte:fragment>
            <svelte:fragment slot="desc">
                <p>
                    Sometimes we want the modal effect, but with a transparent
                    background.
                </p>
                <p>
                    Take Facebook's notifications button as an example. Once
                    active, you can still interact with the main content. If you
                    click on a link outside of the modal, not only will the
                    modal close, but the window will non-artificially navigate.
                </p>
                <p>
                    tldr; you can customize the backdrop modal to your liking,
                    even giving it a width and height of 0.
                </p>
            </svelte:fragment>
            <svelte:fragment slot="samples">
                <Modal>
                    <button slot="button">standard</button>
                    <div slot="modal">
                        <div class="container">
                            <h4>Things about this modal</h4>
                            <ol>
                                <li>✅ active modal</li>
                                <li>✅ layers of nested: 1/1</li>
                                <li>✅ custom backdrop</li>
                                <li>⬜ custom close button</li>
                            </ol>
                            <h4 class="h5">dummy input fields</h4>
                            <div class="inputs">
                                <input type="text" placeholder="1" />
                                <input type="text" placeholder="2" />
                                <input type="text" placeholder="3" />
                                <input type="text" placeholder="4" />
                                <input type="text" placeholder="5" />
                                <input type="text" placeholder="6" />
                                <input type="text" placeholder="7" />
                                <input type="text" placeholder="8" />
                            </div>
                        </div>
                    </div>
                    <div id="custom-bg1" slot="backdrop" />
                </Modal>
                <Modal>
                    <button slot="button"
                        ><span class="material-icons">notifications</span
                        ></button
                    >
                    <div slot="modal">hello</div>
                </Modal>
            </svelte:fragment>
        </Card>
        <Card>
            <svelte:fragment slot="title">Custom Close Button</svelte:fragment>
            <svelte:fragment slot="desc">
                <p>
                    When a modal does not have a close button as the first
                    element, Happy Modals will automatically create one for you!
                </p>
                <p>
                    If the desired effect is to remove the visual button, do not
                    use <span class="code">display: none</span> because this will
                    prevent accessible technologies from accessing the close button.
                </p>
                <p>
                    Instead, change the width, height, overflow, and/or opacity
                    of the button.
                </p>
            </svelte:fragment>
            <svelte:fragment slot="samples">
                <Modal>
                    <button slot="button">standard</button>
                    <div slot="modal">
                        <button id="custom-close1" class="modal-close">x</button
                        >
                        <div class="container">
                            <h4>Things about this modal</h4>
                            <ol>
                                <li>✅ active modal</li>
                                <li>✅ layers of nested: 1/1</li>
                                <li>⬜ custom backdrop</li>
                                <li>✅ custom close button</li>
                            </ol>
                            <h4 class="h5">dummy input fields</h4>
                            <div class="inputs">
                                <input type="text" placeholder="1" />
                                <input type="text" placeholder="2" />
                                <input type="text" placeholder="3" />
                                <input type="text" placeholder="4" />
                                <input type="text" placeholder="5" />
                                <input type="text" placeholder="6" />
                                <input type="text" placeholder="7" />
                                <input type="text" placeholder="8" />
                            </div>
                        </div>
                    </div>
                </Modal>
                <Modal>
                    <button slot="button">free trial</button>
                    <div slot="modal">hello</div>
                </Modal>
            </svelte:fragment>
        </Card>
        <Card>
            <svelte:fragment slot="title">Toggle Button</svelte:fragment>
            <svelte:fragment slot="desc">
                <p>
                    For a button to act like a toggle, all you have to do is add
                    the "toggle" flag.
                </p>
                <p>
                    Clicking the open modal button the first time will open, and
                    the second time will close (clicking anywhere outside the
                    modal will also close the modal).
                </p>
            </svelte:fragment>
            <svelte:fragment slot="samples">
                <Modal toggle raw>
                    <button slot="button">toggle</button>
                    <div slot="modal">
                        <div class="container">
                            <h4>Things about this modal</h4>
                            <ol>
                                <li>✅ active modal</li>
                                <li>✅ layers of nested: 3/3</li>
                                <li>⬜ custom backdrop</li>
                                <li>⬜ custom close button</li>
                            </ol>
                            <h4 class="h5">dummy input fields</h4>
                            <div class="inputs">
                                <input type="text" placeholder="1" />
                                <input type="text" placeholder="2" />
                                <input type="text" placeholder="3" />
                                <input type="text" placeholder="4" />
                                <input type="text" placeholder="5" />
                                <input type="text" placeholder="6" />
                                <input type="text" placeholder="7" />
                                <input type="text" placeholder="8" />
                            </div>
                        </div>
                    </div>
                    <div slot="backdrop" class="modal-backdrop transparent" />
                </Modal>
            </svelte:fragment>
        </Card>
        <Card>
            <svelte:fragment slot="title">Lock Scrolling</svelte:fragment>
            <svelte:fragment slot="desc">
                <p>
                    By default, the entire document locks when a modal is
                    active.
                </p>
                <p>
                    Implementation coming soon. Currently, the entire background
                    is automatically locked.
                </p>
            </svelte:fragment>
            <svelte:fragment slot="samples" />
        </Card>
        <Card>
            <svelte:fragment slot="title">Nested: Standard</svelte:fragment>
            <svelte:fragment slot="desc">
                <p>
                    Although there is no standardized agreement on whether
                    nesting modals is a good or bad practice, Happy Modals
                    allows for this. Additionally, Happy Modals insures
                    accessibility and usability experience.
                </p>
            </svelte:fragment>
            <svelte:fragment slot="samples">
                <Modal>
                    <button slot="button">standard</button>
                    <div slot="modal">
                        <div class="container">
                            <h4>🥚 Things about this modal</h4>
                            <ol>
                                <li>✅ active modal</li>
                                <li>✅ layers of nested: 1/3</li>
                                <li>⬜ custom backdrop</li>
                                <li>⬜ custom close button</li>
                            </ol>
                            <h4 class="h5">dummy input fields</h4>
                            <div class="inputs">
                                <input type="text" placeholder="1" />
                                <input type="text" placeholder="2" />
                                <input type="text" placeholder="3" />
                                <input type="text" placeholder="4" />
                                <input type="text" placeholder="5" />
                                <input type="text" placeholder="6" />
                                <input type="text" placeholder="7" />
                                <input type="text" placeholder="8" />
                            </div>
                            <Modal>
                                <button slot="button">nested in modal</button>
                                <div slot="modal">
                                    <div class="container">
                                        <h4>🐤 Things about this modal</h4>
                                        <ol>
                                            <li>✅ active modal</li>
                                            <li>✅ layers of nested: 2/3</li>
                                            <li>⬜ custom backdrop</li>
                                            <li>⬜ custom close button</li>
                                        </ol>
                                        <h4 class="h5">dummy input fields</h4>
                                        <div class="inputs">
                                            <input
                                                type="text"
                                                placeholder="1"
                                            />
                                            <input
                                                type="text"
                                                placeholder="2"
                                            />
                                            <input
                                                type="text"
                                                placeholder="3"
                                            />
                                            <input
                                                type="text"
                                                placeholder="4"
                                            />
                                            <input
                                                type="text"
                                                placeholder="5"
                                            />
                                            <input
                                                type="text"
                                                placeholder="6"
                                            />
                                            <input
                                                type="text"
                                                placeholder="7"
                                            />
                                            <input
                                                type="text"
                                                placeholder="8"
                                            />
                                        </div>
                                        <Modal>
                                            <button slot="button"
                                                >nested in nested</button
                                            >
                                            <div slot="modal">
                                                <div class="container">
                                                    <h4>
                                                        🍗🍳Things about this
                                                        modal
                                                    </h4>
                                                    <ol>
                                                        <li>✅ active modal</li>
                                                        <li>
                                                            ✅ layers of nested:
                                                            3/3
                                                        </li>
                                                        <li>
                                                            ⬜ custom backdrop
                                                        </li>
                                                        <li>
                                                            ⬜ custom close
                                                            button
                                                        </li>
                                                    </ol>
                                                    <h4 class="h5">
                                                        dummy input fields
                                                    </h4>
                                                    <div class="inputs">
                                                        <input
                                                            type="text"
                                                            placeholder="1"
                                                        />
                                                        <input
                                                            type="text"
                                                            placeholder="2"
                                                        />
                                                        <input
                                                            type="text"
                                                            placeholder="3"
                                                        />
                                                        <input
                                                            type="text"
                                                            placeholder="4"
                                                        />
                                                        <input
                                                            type="text"
                                                            placeholder="5"
                                                        />
                                                        <input
                                                            type="text"
                                                            placeholder="6"
                                                        />
                                                        <input
                                                            type="text"
                                                            placeholder="7"
                                                        />
                                                        <input
                                                            type="text"
                                                            placeholder="8"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </Modal>
                                    </div>
                                </div>
                            </Modal>
                        </div>
                    </div>
                </Modal>
            </svelte:fragment>
        </Card>
        <Card>
            <svelte:fragment slot="title"
                >Nested: Transparent Backdrops</svelte:fragment
            >
            <svelte:fragment slot="desc">
                <p>Demo coming soon.</p>
                <p>
                    Since modal backdrops can be customized, they can also be
                    made transparent by setting width and height to 0px.
                </p>
                <p>
                    If all nested modals have transparent backdrops, clicking
                    outside the modal will close all nested modals.
                </p>
                <p>
                    If some nested modals have transparent backdrops, clicking
                    on a backdrop will close the associated modal and all
                    succeeding nested modals with transparent backdrops.
                </p>
            </svelte:fragment>
            <svelte:fragment slot="samples" />
        </Card>
        <Card>
            <svelte:fragment slot="title"
                >{`Static Mode (dynamic={false})`}</svelte:fragment
            >
            <svelte:fragment slot="desc">
                <p>
                    By default, Modal component is dynamic. The following
                    examples demonstrate static mode.
                </p>
                <p>
                    From the user's perspective, there is no difference between
                    static and dynamic mode, other than potential performance
                    differences.
                </p>
                <p>
                    Static mode preserves DOM nodes and the associated input
                    data, whereas in dynamic mode, this needs to be done
                    manually.
                </p>
                <p>
                    It is recommended to use static mode if the nested features
                    are commonly accessed.
                </p>
            </svelte:fragment>
            <svelte:fragment slot="samples">
                <Modal dynamic={false}>
                    <button slot="button">standard</button>
                    <div slot="modal">
                        <div class="container">
                            <h4>Things about this modal</h4>
                            <ol>
                                <li>✅ active modal</li>
                                <li>✅ layers of nested: 1/1</li>
                                <li>⬜ custom backdrop</li>
                                <li>⬜ custom close button</li>
                            </ol>
                            <h4 class="h5">dummy input fields</h4>
                            <div class="inputs">
                                <input type="text" placeholder="1" />
                                <input type="text" placeholder="2" />
                                <input type="text" placeholder="3" />
                                <input type="text" placeholder="4" />
                                <input type="text" placeholder="5" />
                                <input type="text" placeholder="6" />
                                <input type="text" placeholder="7" />
                                <input type="text" placeholder="8" />
                            </div>
                        </div>
                    </div>
                </Modal></svelte:fragment
            >
        </Card>
        <Card>
            <svelte:fragment slot="title">Fixed Position</svelte:fragment>
            <svelte:fragment slot="desc">
                <p>
                    Some cases, we want a modal feature to be visually seamless.
                    We can pin the location by passing our own parameters.
                </p>
                <p>
                    {`fixed={{
                        x: "300px",
                        y: "4.5em"
                    }}`}
                </p>
            </svelte:fragment>
            <svelte:fragment slot="samples">
                <Modal
                    raw
                    sticky
                    fixed={{
                        x: "0px",
                        y: "0px",
                    }}
                >
                    <button slot="button">fixed</button>
                    <div slot="modal">
                        <div class="container">
                            <h4>Things about this modal</h4>
                            <ol>
                                <li>✅ active modal</li>
                                <li>✅ custom coordinates</li>
                                <li>⬜ custom backdrop</li>
                                <li>⬜ custom close button</li>
                            </ol>
                            <h4 class="h5">dummy input fields</h4>
                            <div class="inputs">
                                <input type="text" placeholder="1" />
                                <input type="text" placeholder="2" />
                                <input type="text" placeholder="3" />
                                <input type="text" placeholder="4" />
                                <input type="text" placeholder="5" />
                                <input type="text" placeholder="6" />
                                <input type="text" placeholder="7" />
                                <input type="text" placeholder="8" />
                            </div>
                        </div>
                    </div>
                </Modal>
            </svelte:fragment>
        </Card>
    </div>
    <Note>
        <LiteModeSwitch slot="icon" />
        <svelte:fragment>
            <p>
                This version has a lot of extra features; to name a few,
                auto-open, prevent close, and lifecycle hooks. Don't need all
                the bells and whistles? Opt for a smaller and simpler package!
            </p>
            <p>
                You can flip this switch any time you want at the top of the
                page.
            </p>
        </svelte:fragment>
    </Note>
</section>
