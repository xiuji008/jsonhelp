<template>
    <div ref="notice" id="notice" :class="['notice', { type: type }]">{{ msg }}</div>
</template>

<style lang="scss" scoped>
.notice {
    padding: 20px;
    text-align: center;
    color: #fff;
    font-size: 16px;
    position: fixed;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 999;
    visibility: hidden;
    top: -100px;
    transition: all 0.3s;
    &.success {
        background: #3fa9f5;
    }
    &.error {
        background: #d44945;
    }
    &.show {
        visibility: visible;
        top: 0;
    }
}
</style>

<script>
export default {
    name: "notice",
    data() {
        return {
            type: "success",
            msg: "操作成功",
            duration: 1500
        };
    },
    props: {},
    methods: {
        show: function(type, msg,timer) {
            this.type = type;
            this.msg = msg;
            
            this.$refs.notice.className = "notice show " + type;
            setTimeout(() => {
                this.$refs.notice.className = "notice";
            }, timer?timer:this.duration);
        }
    }
};
</script>