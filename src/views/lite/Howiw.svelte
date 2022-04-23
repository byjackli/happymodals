<script lang="ts">
    export let isolated = true;
    const summary = [
            {
                step: "-",
                caption: `Simple explanation of how the code works (with visualizations).`,
                list: [`just scroll or click "next"`],
            },
            {
                step: "1a",
                caption: `creating the Modal Manager`,
                list: [
                    `the modal manager contains all active modals and their backdrops`,
                    `create and add the "modal-manager" to the DOM`,
                    `add click event listeners to the html element`,
                ],
            },
            {
                step: "1b",
                caption: `hiding inactive modal elements`,
                list: [
                    `find all elements with role="dialog" and class="modal-backdrop" and hide them from the user`,
                    `add aria-hidden="true" and class="modal-inactive" to each of those elements`,
                ],
            },
            {
                step: "2",
                caption: `clicking on a button that opens a modal`,
                list: [
                    `the button that was clicked is added to the trackButton stack`,
                    `the associated modal and it's backdrop is moved to the Modal Manager`,
                    `the modal is made visible`,
                    `everything with the class "modal-scroll-lock" is locked`,
                ],
            },
            {
                step: "3",
                caption: `check for close modal button`,
                list: [
                    `the first element of the modal should be a close modal button`,
                    `if it's not there, the Modal Manager will automatically create one`,
                ],
            },
            {
                step: "4",
                caption: `check for modal backdrop`,
                list: [
                    `the modal's next element sibling should be a backdrop`,
                    `if the modal does not have a backdrop, the Modal Manager will automatically create one`,
                ],
            },
            {
                step: "5",
                caption: `clicking on a close modal button or anywhere outside the modal`,
                list: [
                    `the modal as well as the backdrop are both hidden from the user`,
                    `class="modal-inactive" and aria-hidden="true" are added`,
                ],
            },
            {
                step: "6",
                caption: `the modal and its respective elements are moved back to its original position`,
                list: [
                    `everything including auto-generated are moved back`,
                    `the element in focus before the modal was opened is resumed`,
                    `everything with the class "modal-scroll-lock" is unlocked`,
                ],
            },
        ],
        lit = 1.0,
        dim = 0.4;

    let step,
        cursor = 0;
    $: opacity = {
        html: [0, 3, 4, 5, 6, 7].includes(cursor) ? lit : dim,
        body: [0].includes(cursor) ? lit : dim,
        section: [0].includes(cursor) ? lit : dim,
        section2: [0].includes(cursor) ? lit : dim,
        section3: [0].includes(cursor) ? lit : dim,
        button: [0].includes(cursor) ? lit : dim,
        dialog: [0, 2, 3, 7].includes(cursor) ? lit : dim,
        "dialog-pt2": [0, 2, 3, 4, 5, 6].includes(cursor) ? lit : dim,
        "modal-manager": [1].includes(cursor) ? lit : dim,
        "modal-backdrop": [5, 6].includes(cursor) ? lit : dim,
        "modal-backdrop-pt2": [7].includes(cursor) ? lit : dim,
        button2: [4, 5, 6].includes(cursor) ? lit : dim,
        "button2-pt2": [7].includes(cursor) ? lit : dim,
    };
    $: disabled = {
        html: [].includes(cursor),
        body: [].includes(cursor),
        section: [].includes(cursor),
        section2: [].includes(cursor),
        section3: [].includes(cursor),
        button: [].includes(cursor),
        dialog: [3, 4, 5, 6].includes(cursor),
        "dialog-pt2": [0, 1, 2, 7].includes(cursor),
        "modal-manager": [0].includes(cursor),
        "modal-backdrop": [0, 1, 2, 3, 4, 7].includes(cursor),
        "modal-backdrop-pt2": [0, 1, 2, 3, 4, 5, 6].includes(cursor),
        button2: [0, 1, 2, 3, 7].includes(cursor),
        "button2-pt2": [0, 1, 2, 3, 4, 5, 6].includes(cursor),
    };

    function nav(event, direction, reset) {
        if (direction === "next" && cursor < summary.length - 1) cursor++;
        else if (direction === "prev" && 0 < cursor) cursor--;
        if (reset) step.focus();
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
                class="html scroll-{2 < cursor && cursor < 7}"
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
                        class="dialog {disabled['dialog-pt2']}"
                        style="background-color: rgba(217, 199, 255,{opacity[
                            'dialog-pt2'
                        ]}); color: rgba(28,28,28,{opacity['dialog-pt2']})"
                        disabled={disabled["dialog-pt2"]}
                        aria-disabled={disabled["dialog-pt2"]}
                    >
                        div role="dialog" {5 < cursor
                            ? `class="modal-inactive" aria-hidden="true"`
                            : `aria-hidden="false"`}
                        <div
                            class="button {disabled['button2']}"
                            style="background-color: rgba(222, 150, 150,{opacity[
                                'button2'
                            ]}); color: rgba(28,28,28,{opacity['button2']})"
                        >
                            button class="modal-close"
                        </div>
                    </div>
                    <div
                        class="button {disabled['modal-backdrop']}"
                        style="background-color: rgba(150, 157, 222,{opacity[
                            'modal-backdrop'
                        ]}); color: rgba(28,28,28,{opacity['modal-backdrop']})"
                    >
                        div class="modal-backdrop" {5 < cursor
                            ? `class="modal-inactive" aria-hidden="true"`
                            : `aria-hidden="false"`}
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
                            class="button"
                            style="background-color: rgba(150, 157, 222,{opacity[
                                'button'
                            ]}); color: rgba(28,28,28,{opacity['button']})"
                        >
                            button class="modal-open"
                        </div>
                        <div
                            class="dialog {disabled['dialog']}"
                            style="background-color: rgba(217, 199, 255,{opacity[
                                'dialog'
                            ]}); color: rgba(28,28,28,{opacity['dialog']})"
                            disabled={disabled["dialog"]}
                            aria-disabled={disabled["dialog"]}
                        >
                            div role="dialog" {1 < cursor
                                ? `class="modal-inactive" aria-hidden="true"`
                                : ""}
                            <div
                                class="button {disabled['button2-pt2']}"
                                style="background-color: rgba(222, 150, 150,{opacity[
                                    'button2-pt2'
                                ]}); color: rgba(28,28,28,{opacity[
                                    'button2-pt2'
                                ]})"
                            >
                                button class="modal-close"
                                class="modal-inactive" aria-hidden="true"
                            </div>
                        </div>
                        <div
                            class="button {disabled['modal-backdrop-pt2']}"
                            style="background-color: rgba(150, 157, 222,{opacity[
                                'modal-backdrop-pt2'
                            ]}); color: rgba(28,28,28,{opacity[
                                'modal-backdrop-pt2'
                            ]})"
                        >
                            div class="modal-backdrop" class="modal-inactive"
                            aria-hidden="true"
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
    </div>
</section>
