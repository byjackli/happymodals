<script lang="ts">
    import Note from "../../components/Note.svelte";
    export let isolated = true;
    const lit = 1.0,
        dim = 0.4;

    let step,
        cursor = 0,
        type = "dynamic";

    $: summary =
        type === "dynamic"
            ? [
                  {
                      step: "-",
                      caption: `Choose between two different modal types, dynamic and static.`,
                      list: [
                          `in a dynamic modal, the modal is removed from the DOM when inactive, whereas the modal in a static modal will always be active.`,
                      ],
                  },
                  {
                      step: "1",
                      caption: `initiate Happy Modals`,
                      list: [
                          `div container named “modal-manager” is created and placed on the DOM`,
                          `the "modal-manager" contains all active modals add click event listener that manages clicking outside the modal`,
                          `add click event listeners to the html element`,
                      ],
                  },
                  {
                      step: "2a",
                      caption: `before opening a modal`,
                      list: [
                          `if modal has a “beforeOpen” lifecycle hook, run immediately`,
                          `add the modal to the "modal container"`,
                          `add the "modal container" to the trackContainer stack`,
                      ],
                  },
                  {
                      step: "2b",
                      caption: `while opening modal`,
                      list: [
                          `the modal and its backdrop is moved to the modal manager`,
                          `everything with the class “modal-scroll-lock” is locked`,
                          `if modal has “afterOpen” lifecycle hook, run immediately`,
                      ],
                  },
                  {
                      step: "3a",
                      caption: `clicking on a close modal button or anywhere outside the modal
`,
                      list: [
                          `if modal has “beforeClose” lifecycle hook, run immediately`,
                          `the modal and its respective elements are moved back to its original position`,
                      ],
                  },
                  {
                      step: "3b",
                      caption: `modal is removed from DOM`,
                      list: [
                          `the modal is removed from the DOM`,
                          `the element in focus before the modal was opened is resumed`,
                          `everything with the class "modal-scroll-lock" is unlocked`,
                          `if modal has "afterClose" lifecycle hook, run last`,
                      ],
                  },
              ]
            : [
                  {
                      step: "-",
                      caption: `Choose between two different modal types, dynamic and static.`,
                      list: [
                          `in a dynamic modal, the modal is removed from the DOM when inactive, whereas the modal in a static modal will always be active.`,
                      ],
                  },
                  {
                      step: "1",
                      caption: `initiate Happy Modals`,
                      list: [
                          `div container named “modal-manager” is created and placed on the DOM`,
                          `the "modal-manager" contains all active modals add click event listener that manages clicking outside the modal`,
                          `add click event listeners to the html element`,
                      ],
                  },
                  {
                      step: "2a",
                      caption: `before opening a modal`,
                      list: [
                          `if modal has a “beforeOpen” lifecycle hook, run immediately`,
                          `add the modal to the "modal container"`,
                          `add the "modal container" to the trackContainer stack`,
                      ],
                  },
                  {
                      step: "2b",
                      caption: `while opening modal`,
                      list: [
                          `the modal and its backdrop is moved to the modal manager`,
                          `everything with the class “modal-scroll-lock” is locked`,
                          `if modal has “afterOpen” lifecycle hook, run immediately`,
                      ],
                  },
                  {
                      step: "3a",
                      caption: `clicking on a close modal button or anywhere outside the modal
`,
                      list: [
                          `if modal has “beforeClose” lifecycle hook, run immediately`,
                          `everything including auto-generated are moved back`,
                      ],
                  },
                  {
                      step: "3b",
                      caption: `the modal elements are hidden from the user`,
                      list: [
                          `aria-hidden="true" are added to the modal and backdrop`,
                          `the element in focus before the modal was opened is resumed`,
                          `everything with the class "modal-scroll-lock" is unlocked`,
                          `if modal has "afterClose" lifecycle hook, run last`,
                      ],
                  },
              ];
    $: opacity = {
        html: [0, 3, 4, 5].includes(cursor) ? lit : dim,
        body: [0, 5].includes(cursor) ? lit : dim,
        section: [0, 5].includes(cursor) ? lit : dim,
        section2: [0, 5].includes(cursor) ? lit : dim,
        section3: [0, 5].includes(cursor) ? lit : dim,
        button: [0, 5].includes(cursor) ? lit : dim,
        backdrop: [0, 2, 3, 4, 5].includes(cursor) ? lit : dim,
        dialog: [0, 2, 3, 4, 5].includes(cursor) ? lit : dim,
        "dialog-pt2": [0, 2, 3, 4, 5].includes(cursor) ? lit : dim,
        "modal-manager": [1, 5].includes(cursor) ? lit : dim,
        "modal-container": [0, 2, 3, 4, 5].includes(cursor) ? lit : dim,
        "modal-container-pt2": [3, 4].includes(cursor) ? lit : dim,
        button2: [4, 5, 6].includes(cursor) ? lit : dim,
        "button2-pt2": [0, 2, 7].includes(cursor) ? lit : dim,
    };
    $: disabled = {
        html: [].includes(cursor),
        body: [].includes(cursor),
        section: [].includes(cursor),
        section2: [].includes(cursor),
        section3: [].includes(cursor),
        button: [].includes(cursor),
        dialog: [3, 4].includes(cursor),
        "dialog-pt2": [0, 1, 2, 7].includes(cursor),
        "modal-manager": [0].includes(cursor),
        "modal-container":
            (type === "dynamic" && [0, 1, 3].includes(cursor)) ||
            cursor === 3 ||
            (type === "dynamic" && cursor === 5),
        "modal-container-pt2": [0, 1, 2, 4, 5].includes(cursor),
        button2: [0, 1, 2, 3].includes(cursor),
        "button2-pt2": [2, 3, 4, 5].includes(cursor),
    };

    function nav(event, direction, reset) {
        if (direction === "next" && cursor < summary.length - 1) cursor++;
        else if (direction === "prev" && 0 < cursor) cursor--;
        if (reset) step.focus();
    }

    function changeType() {
        type = type === "dynamic" ? "static" : "dynamic";
    }
</script>

<section class="howiw">
    <div class="main">
        <div class="summary">
            <div>
                {#if isolated}
                    <h1 class="h4">how it works</h1>
                {:else}
                    <h2 class="h4">how it works</h2>
                {/if}

                <!-- <Note>
                    <span class="material-icons" slot="icon">info</span>
                    <p>coming soon</p>
                </Note> -->
                <div class="controls">
                    <button
                        disabled={!cursor}
                        aria-disabled={!cursor}
                        on:click={(event) => nav(event, "prev", true)}
                    >
                        <span class="material-icons">arrow_left</span>
                    </button>
                    <button
                        disabled={cursor === summary.length - 1}
                        aria-disabled={cursor === summary.length - 1}
                        on:click={(event) => nav(event, "next", true)}
                    >
                        <span>next</span>
                        <span class="material-icons">trending_flat</span>
                    </button>
                    <button on:click={changeType}>{type}</button>
                </div>
            </div>
            <div>
                <span bind:this={step} class="h4"
                    >step {summary[cursor].step}</span
                >
                <p>{summary[cursor].caption}</p>
            </div>
            <ul>
                {#each summary[cursor].list as point (point)}
                    <li>{point}</li>
                {/each}
            </ul>
        </div>
        <div class="diagram">
            <div
                class="html scroll-{2 < cursor && cursor < 5}"
                style="background-color: rgba(191, 255, 213,{opacity[
                    'html'
                ]}); color: rgba(28,28,28,{opacity['html']})"
            >
                html {2 < cursor && cursor < 7
                    ? `class="modal-scroll-locked"`
                    : ""}
                <div
                    class="modal-manager {disabled['modal-manager']}"
                    style="background-color: rgba(133, 190, 243,{opacity[
                        'modal-manager'
                    ]}); color: rgba(28,28,28,{opacity['modal-manager']})"
                    disabled={disabled["modal-manager"]}
                    aria-disabled={disabled["modal-manager"]}
                >
                    div id="modal-manager"

                    <div
                        class="container {disabled['modal-container-pt2']}"
                        style="background-color: rgba(255, 248, 190,{opacity[
                            'modal-container-pt2'
                        ]}); color: rgba(28,28,28,{opacity[
                            'modal-container-pt2'
                        ]})"
                    >
                        {type === "static"
                            ? `div class="modal-container true" aria-hidden="false"`
                            : `div class="modal-container"`}
                        <div
                            class="dialog"
                            style="background-color: rgba(217, 199, 255,1); color: rgba(28,28,28,1)"
                        >
                            div role="dialog"
                            <div
                                class="button"
                                style="background-color: rgba(222, 150, 150, 1); color: rgba(28,28,28,1)"
                            >
                                button class="modal-close"
                            </div>
                        </div>
                        <div
                            class="button"
                            style="background-color: rgba(150, 157, 222,1); color: rgba(28,28,28,1)"
                        >
                            div class="modal-backdrop"
                        </div>
                    </div>
                </div>
                <div
                    class="body"
                    style="background-color: rgba(191, 224, 255,{opacity[
                        'body'
                    ]}); color: rgba(28,28,28,{opacity['body']})"
                >
                    body class="modal-scroll-lock"
                    <div
                        class="section"
                        style="background-color: rgba(222, 150, 150,{opacity[
                            'section2'
                        ]}); color: rgba(28,28,28,{opacity['section2']})"
                    >
                        section

                        <div
                            style="background-color: rgba(255, 248, 190,{opacity[
                                'section2'
                            ]}); color: rgba(28,28,28,{opacity['section2']})"
                        >
                            div class="modal-origin"
                            <div
                                class="button"
                                style="background-color: rgba(150, 157, 222,{opacity[
                                    'button'
                                ]}); color: rgba(28,28,28,{opacity['button']})"
                            >
                                button class="modal-open"
                            </div>
                        </div>
                        <div
                            class="container {disabled['modal-container']}"
                            style="background-color: rgba(255, 248, 190,{opacity[
                                'modal-container'
                            ]}); color: rgba(28,28,28,{opacity[
                                'modal-container'
                            ]})"
                        >
                            {4 < cursor || type === "static"
                                ? `div class="modal-container false" aria-hidden="true"`
                                : `div class="modal-container"`}
                            <div
                                class="dialog"
                                style="background-color: rgba(217, 199, 255,1); color: rgba(28,28,28,{opacity[
                                    'dialog'
                                ]})"
                            >
                                div role="dialog"
                                <div
                                    class="button"
                                    style="background-color: rgba(222, 150, 150,1); color: rgba(28,28,28,{opacity[
                                        'dialog'
                                    ]})"
                                >
                                    button class="modal-close"
                                </div>
                            </div>
                            <div
                                class="button"
                                style="background-color: rgba(150, 157, 222,1); color: rgba(28,28,28,{opacity[
                                    'backdrop'
                                ]})"
                            >
                                div class="modal-backdrop"
                            </div>
                        </div>
                    </div>
                    <div
                        class="section"
                        style="background-color: rgba(222, 150, 150,{opacity[
                            'section'
                        ]}); color: rgba(28,28,28,{opacity['section']})"
                    >
                        section
                    </div>
                    <div
                        class="section"
                        style="background-color: rgba(222, 150, 150,{opacity[
                            'section3'
                        ]}); color: rgba(28,28,28,{opacity['section3']})"
                    >
                        section
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div>
        <button class="forTab" on:click={(event) => nav(event, "prev", true)}
            >previous</button
        >
        <button class="forTab" on:click={(event) => nav(event, "next", true)}
            >next step</button
        >
        <button class="forTab" on:click={changeType}>{type}</button>
    </div>
</section>
