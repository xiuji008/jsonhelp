<template>
    <div ref="editor" style="flex: 1"></div>
</template>

<script>
import JSONEditor from "jsoneditor/dist/jsoneditor-minimalist.js";
import "jsoneditor/dist/jsoneditor.min.css";

export default {
    name: "editor",
    props: {
        content: String
    },
    mounted() {
        // create the editor
        const container = this.$refs.editor;
        const options = {
            onChange: this._onChange
        };
        this.editor = new JSONEditor(container, options);
        this.editor.set(this.json);
    },
    methods: {
        _onChange() {
            if (this.onChange && this.editor) {
                this.onChange(this.editor.get());
            }
        }
    }
};
</script>

