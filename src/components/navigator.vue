<template>
    <header id="header">
        <nav>
            <a class="logo1" title="json.help"><img :src="baseUrl + 'gzh.jpg'" width="20%">    <span>   更多工具请关注公众号，发送 <b>工具</b> 获取</span></a>
            <ul></ul>
        </nav>

    </header>
</template>

<script>
export default {
    name: "navigator",
    computed: {
        // GitHub Pages 子路径部署时指向 /jsonhelp/
        baseUrl() {
            return process.env.BASE_URL
        }
    }
};
</script>

<style lang="scss" scoped>
header {
    padding: 20px 30px;
    background: #111;
    display: flex;
    flex-direction: column;
    nav {
        flex: 1;
        display: flex;
        padding-bottom: 20px;
        border-bottom: 1px solid rgba($color: #fff, $alpha: 0.05);
        a.logo {
            flex: 1;
            font-size: 30px;
            font-weight: 700;
            display: inline-block;
            color: #3fa9f5;
            span {
                color: rgba($color: #fff, $alpha: 0.9);
                display: inline-block;
            }
        }
        ul {
            flex: 4;
            text-align: right;
            margin: 0;
            padding: 10px 0;
            a {
                justify-content: center;
                display: inline-block;
                padding-left: 20px;
                color: #4a5560;
                font-size: 12px;
                text-decoration: none;
                font-weight: bold;
            }
        }
    }
    .version {
        display: flex;
        padding-top: 20px;
        color: #666;
        span:first-child {
            flex: 1;
            font-size: 12px;
        }
        span:last-child {
            flex: 1;
            text-align: right;
            font-size: 12px;
        }
        span a {
            color: inherit;
            text-decoration: none;
            display: inline-block;
            margin: 0 5px;
            border-bottom: 1px solid #ccc;
        }
    }
}

@media (prefers-color-scheme: light) {
    header{
        background: #fff;
        nav {
            border-bottom: 1px solid rgba($color: #000, $alpha: 0.05);
            a.logo {
                span {
                    color: rgba($color: #000, $alpha: 0.9);
                    display: inline-block;
                }
            }
        }
    }
}
</style>