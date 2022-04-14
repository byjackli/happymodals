<script>
    import Logo from "./Logo.svelte";
    import LiteModeSwitch from "./LiteModeSwitch.svelte";
</script>

<nav id="main">
    <a class="lhs" href="/" title="home">
        <Logo />
        <div class="logo-text">
            <span>happy modals</span>
            <span>make modals assitive-technology-friendly</span>
        </div>
    </a>
    <div class="rhs">
        <ul>
            <li><a href="/docs/sample">sample</a></li>
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
