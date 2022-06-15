<script>
    import Logo from "./Logo.svelte";
    import LiteModeSwitch from "./LiteModeSwitch.svelte";
    import LiteModeStore from "../store/LiteModeStore";
</script>

<nav id="main">
    <a class="lhs" href="/" title="home">
        <Logo />
        <div class="logo-text">
            <span>happy modals{$LiteModeStore ? " (lite)" : ""}</span>
            <span>make modals assistive-technology-friendly</span>
        </div>
    </a>
    <div class="rhs">
        <ul>
            <li><a href="/docs/examples">examples</a></li>
            <li><a href="/docs">docs</a></li>
            <li>
                <a
                    href="https://github.com/byjackli/happymodals"
                    rel="noreferrer">code</a
                >
            </li>
        </ul>
        <LiteModeSwitch />
    </div>
</nav>
