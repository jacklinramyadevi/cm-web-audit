<template>
  <div class="sections">
    <div class="pl_body" style="text-align:center;margin:0 auto;">
        <h1 style="border:0;margin-top:40px;font-size:32px;">黑名单查询</h1>
        <Form :model="formSel" class="downMenu blackChk">
            <FormItem>
                <Input v-model="formSel.input" icon="ios-search" placeholder="名称/姓名/手机号"></Input>
                <Button type="success" @click="chkClick">查询</Button>
            </FormItem>
        </Form>
        <div class="table_show" v-if="vs==true">
            <table class="headerTb smallTb" border="0" cellpadding="0" cellspacing="0">
                <tr>
                    <td class="txt_center">姓名</td><td>张三</td>
                </tr>
                <tr>
                    <td class="txt_center">身份证号</td><td>220130198702025123</td>
                </tr>
                <tr>
                    <td class="txt_center">手机号</td><td>13622254444</td>
                </tr>
                <tr>
                    <td class="txt_center">角色</td><td>业务员</td>
                </tr>
                <tr>
                    <td class="txt_center">黑名单类型</td><td>征信黑名单</td>
                </tr>
            </table>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sections',
  data () {
    return {
        formSel:{
            input:''
        },
        vs:false,
	    }
	},
    computed :{
        pageWin(){
            return Math.max(window.innerWidth,document.documentElement.clientWidth,document.body.clientWidth);
        }
    },
	methods: { 
        chkClick(){
            this.vs=true;
        }
    }
}
</script>

