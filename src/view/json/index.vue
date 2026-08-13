<template>

    <section class="home">
        <navigator></navigator>
        <notice ref="alert"></notice>
        <div class="content">

            <div class="tools" ref="tools">
                <div class="item">
                    <div class="">
                        <a @click="toAuto" :class="{active: tools.auto}">自动转换</a>
                        <a @click="toXml">转XML</a>
                        <a @click="toYaml">转YAML</a>
                        <a @click="onZip">压缩</a>
                    </div>
                    <div class="">
                        <a class="copy" @click="onCopy('left')"><copy theme="outline" size="20" :strokeWidth="3"/>复制</a>
                        <a :class="{'active':tools.auto}" @click="onFormat"><format theme="outline" size="20" :strokeWidth="3"/>格式化</a>
                        <a @click="onClear"><clear theme="outline" size="20" :strokeWidth="3"/>全部清空</a>
                    </div>
                </div>
                <div class="item">
                    <div class="">
                        <a @click="toText"><text-svg theme="outline" size="20" :strokeWidth="3"/>转文本</a>
                        <a @click="expandAll"><preview-open theme="outline" size="25" :strokeWidth="3"/>全部展开</a>
                        <a @click="collapseAll"><preview-close theme="outline" size="25" :strokeWidth="3"/>全部关闭</a>
                    </div>
                    <div class="">
                        <a @click="onEditor" :class="{active: tools.editor}"><edit theme="outline" size="20" :strokeWidth="3"/>编辑</a>
                        <a class="copy" @click="onCopy('right')"><copy theme="outline" size="20" :strokeWidth="3"/>复制</a>
                    </div>
                </div>
            </div>
                        

            <div class="main">
                <div class="item">
                    <div class="input">
                        <codemirror style="width:500px" ref="codemirror" @change="onInput" :options="codemirror" v-model.trim="content"></codemirror>
                        <p class="placeholder" v-if="content == ''">{{codemirror.placeholder}}</p>
                    </div>
                </div>
                <div class="item">
                    <div class="format">
                        <editor :style="{'flex':1}" :options="editor" :json="format" ref="editor"></editor>
                    </div>
                </div>
            </div>
        </div>


        <div class="scrollTop" @click="returnTop" v-if="scrollTop">
            <v-icon name="arrow-up" title="返回顶部"></v-icon>
        </div>
    </section>


</template>
<style lang="scss">
.CodeMirror {
    flex: 1;
    height: auto;
    position: relative;
    display: block;
    background: none;
    font-size: 14px;
}

div.jsoneditor{
    border: none;
    .jsoneditor-menu{
        display: none;
    }
}
@media (prefers-color-scheme: dark) {
    .jsoneditor-schema-error, div.jsoneditor td, div.jsoneditor textarea, div.jsoneditor th, div.jsoneditor-field, div.jsoneditor-value{
        color: #f8f8f2;
    }
}


</style>
<style lang="scss" scoped>

.home{
    display: flex;
    flex-direction: column;
    height: 100%;
    navigator{
        display: flex;
    }
    .scrollTop{
        position: fixed;
        right: 30px;
        bottom: 30px;
        z-index: 99999;
        background: rgba($color: #000, $alpha: .9);
        box-shadow: 0 30px 30px rgba($color: #000, $alpha: .1);
        border-radius: 50%;
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-size: 40px;
        color: #fff;
        cursor: pointer;
    }
    .content{
        display: flex;
        flex: 1;
        flex-direction: column;
        .tools{
            display: flex;
            align-items: center;
            background: #222;
            transition: all 0.3s;
            &.pin{
                position: fixed;
                left: 0;
                right: 0;
                top: 0;
                z-index: 99999;
                background: rgba($color: #ffffff, $alpha: .9);
                box-shadow: 0 30px 30px rgba($color: #000, $alpha: .1)
            }
            .item{
                flex: 1;
                padding: 15px 30px;
                display: flex;
                div{
                    flex: 1;
                    display: flex;
                    align-items: center;
                    &:last-child{
                        text-align: right;
                        justify-content: flex-end;
                    }
                }
                a{
                    padding: 0 10px;
                    font-size: 14px;
                    color: #666;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    span{
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        padding-right: 5px;
                    }
                    &.success{
                        color: #07c160;
                    }
                    &.active,
                    &:hover{
                        color: #3fa9f5;
                        font-weight: bold;
                    }
                }
            }
        }
        .main{
            display: flex;
            flex: 1;
            width: 100%;
            background: #282a36;
            .item{
                flex: 1;
                display: flex;
                position: relative;
                
                &:first-child{
                    border-right: 1px solid rgba($color: #fff, $alpha: .1);
                }
                .input{
                    display: flex;
                    flex: 1;
                    position: relative;
                    .placeholder{
                        position: absolute;
                        left: 35px;
                        top: 3px;
                        font-size: 14px;
                        color: #999;
                    }
                    .vue-codemirror-wrap{
                        flex: 1;
                        display: flex;
                        position: relative;
                        flex-direction: column;
                        word-wrap:break-word
                    }
                }
                .format{
                    flex: 1;
                    padding: 15px 0;
                }
            }
        }
    }
}

@media (prefers-color-scheme: light) {
    .home{
        .content{
            .tools{
                background: #eee;
            }
            .main{
                background: #fff;
                .item{
                    &:first-child{
                        border-right: 1px solid rgba($color: #000, $alpha: .1);
                    }
                }
            }
        }
        
    }
}

</style>

<script>
import navigator from "../../components/navigator.vue";
import notice from "../../components/notice.vue";
import editor from 'vue2-jsoneditor';
import { codemirror } from 'vue-codemirror-lite'
import vkbeautify from 'vkbeautify'
import Clipboard from 'clipboard';
const YAML = require('json2yaml')
const x2js = require('x2js')
import "codemirror/theme/dracula.css"
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/yaml/yaml'

import {PreviewOpen,PreviewClose,Text,Format,Copy,Clear,Edit} from "@icon-park/vue"

export default {



    data(){
        return {
            scrollTop: false,
            tools: {
                xml: false,
                yaml: false,
                editor: true,
                undo: false,
                auto: true,
            },
            codemirror: {
                modes: [
                    {name: "javascript", json: true},
                    {name: "application/xml", json: true},
                    {name: "application/yaml", json: true},
                ],

                tabSize: 4,// tab的空格个数
                styleActiveLine: true,//line选择是是否加亮
                matchBrackets: true,
                autofocus: true,
                lineNumbers: true,
                lineWrapping: true,
                placeholder: '输入或粘贴JSON/XML',
                extraKeys: {'Ctrl-Space': 'autocomplete'}
            },
            editor: {
                mode: 'tree',
                search: false
            },
            content: '',
            format: '',
        }
    },

    components: {
        navigator,
        editor,
        notice,
        codemirror,
        PreviewOpen,
        PreviewClose,
        'TextSvg':Text,
        Format,
        Copy,
        Clear,
        Edit
    },

    mounted () {
        let _this = this;
        window.onscroll = function() {
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if(scrollTop > 183){
                _this.$refs.tools.className = 'tools pin';
                _this.scrollTop = true;
            }else{
                _this.$refs.tools.className = 'tools';
                _this.scrollTop = false;
            }
        }

        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        if (systemTheme.matches) { // 是深色
            this.$refs.codemirror.editor.setOption('theme','dracula')
        }
    },

    methods: {

        returnTop: function() {
            try{
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
            }catch(e){
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            }
        },

        onInput: function(value){
            var xmlJson = new x2js();
            if(this.tools.auto){
                if (value.substr(0, 1) === '<' && value.substr(-1, 1) === '>') {
                    this.format = xmlJson.xml2js(value);
                }else{
                    try{
                        this.format = JSON.parse(value);
                    }catch(e){
                        this.format = e.message;
                    }
                }
            }
        },

        toText: function(){
            const editor = this.$refs.editor.editor;
            this.content = JSON.stringify(editor.get(), null, 4);
        },

        onZip: function(){
            if (this.content.substr(0, 1) === '<' && this.content.substr(-1, 1) === '>') {
                try{
                    this.content = vkbeautify.xmlmin(this.content,true);
                }catch(e){
                    this.$refs.alert.show('error','XML解析失败:'+e.message,1000);
                }
            }else{
                try{
                    this.content = JSON.stringify(JSON.parse(this.content));
                }catch(e){
                    this.$refs.alert.show('error','JSON解析失败:'+e.message,1000);
                }
            }
        },

        onCopy: function(type) {
            let content = '';
            if(type == 'left'){
                content = this.content;
            }else{
                let editor  = this.$refs.editor.editor;
                content = JSON.stringify(editor.get(), null, 4);
            }

            let clipboard = new Clipboard('.copy', {
                text: function () {
                    return content
                }
            })
            clipboard.on('success', () => {
                this.$refs.alert.show('success','复制成功');
                clipboard.destroy()
            })
            clipboard.on('error', () => {
                this.$refs.alert.show('error','复制失败,请手动复制');
                clipboard.destroy()
            })
        },

        toAuto: function(){
            this.tools.auto = !this.tools.auto;
        },

        toXml: function(){
            if (this.content.substr(0, 1) === '<' && this.content.substr(-1, 1) === '>') {
                this.$refs.alert.show('error','已经是xml格式')
            }else{
                var xmlJson = new x2js();
                try{
                    this.content = vkbeautify.xml(xmlJson.js2xml(JSON.parse(this.content)),4);
                }catch(e){
                    this.$refs.alert.show('error','JSON解析失败:'+e.message,1000);
                }
            }
        },

        toYaml: function(){
            if (this.content.substr(0, 1) === '<' && this.content.substr(-1, 1) === '>') {
                try{
                    var xmlJson  = new x2js();
                    this.content = xmlJson.xml2js(this.content);
                    this.content = YAML.stringify(this.content);
                }catch(e){
                    this.$refs.alert.show('error','XML解析失败:'+e.message,1000);
                }
            }else{
                try{
                    this.content  = YAML.stringify(JSON.parse(this.content));
                }catch(e){
                    this.$refs.alert.show('error','JSON解析失败:'+e.message,1000);
                }
            }
        },

        onClear: function(){
            this.$refs.editor.editor.clear();
            this.content = '';
        },

        onEditor: function(){
            let mode = this.tools.editor?'view':'tree';
            this.$refs.editor.editor.setMode(mode);
            this.tools.editor = !this.tools.editor;
        },


        onFormat: function(){
            if (this.content.substr(0, 1) === '<' && this.content.substr(-1, 1) === '>') {
                var xmlJson = new x2js();
                this.format = xmlJson.xml2js(this.content);
            }else{
                try{
                    this.format = JSON.parse(this.content);
                }catch(e){
                    this.format = e.message;
                    this.$refs.alert.show('error','JSON解析失败:'+e.message,1000);
                }
            }
        },

        collapseAll: function(){
            this.$refs.editor.editor.collapseAll()
        },

        expandAll: function(){
            this.$refs.editor.editor.expandAll()
        },
        

    }
    
};
</script>