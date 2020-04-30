<template>
    <el-container>
        <el-main>
            <div id="edit">
                <div id="ti">
                    Create group
                </div>
                <el-input 
                id="i"
                placeholder="Search for your groups..." ></el-input>
            </div>
            <div id="e-up">
                <div class="kk">Photo</div>
                <el-upload
                    class="up"
                    :action="protocol + '//' + '118.126.104.223' + ':80/admin/upload_room'"
                    drag
                    :limit="1"
                    :data="data"
                    ref="upload"
                    :auto-upload="false">
                    <div class="upload">
                                    <i 
                                    class="pppc el-icon-picture-outline"></i>
                                    <div class="tx">You can upload jpg,gif or png files.</div>
                                    <div class="tx">Max file size 3mb</div>
                                </div>
                </el-upload>
                <div class="kk">Name</div>
                <el-input  class="i" v-model="NameP" placeholder="Group Name"></el-input>
                <div class="kk">Topic (optional)</div>
                <el-input  class="i" v-model="toP" placeholder="Group Topic"></el-input>
                <div class="kk">Description</div>
                <el-input  class="i" v-model="deP" placeholder="Group Description"></el-input>
                <div  style="margin:10px 140px;">
                    <el-button @click="put" type="primary"><div style="margin:0 40px;font-size:13px">Creste group</div></el-button>
                </div>
            </div>
        </el-main>
    </el-container>
</template>

<script>

export default {
    data () {
        return {
            protocol:location.protocol,
            NameP : '',
            idP: 0,
            toP: '',
            deP: '',
            data: {
                room_id: 0,
            }
        }
    },
    mounted () {
        console.log(this.$refs.upload.submit)
    },
    methods : {
        put () {
            //this.$refs.upload.submit()
            let data = {
                roomname : this.NameP,
                creator : this.$store.state.name,
                token : this.$store.state.token,
                userid : this.$store.state.id,
                info : 'Topic: ' + this.toP + 'Description: ' + this.deP
            }
            this.$axios
                .post(
                    location.protocol + '//' + '118.126.104.223' + ':80/admin/create_room',
                    data
                )
                .then((res) => {
                    if(res.data.status === 2000){
                        alert('success')
                        this.data.room_id = res.data.room.id
                        this.idP = res.data.room.id
                        this.$refs.upload.submit()
                        this.$store.commit('putRoom',res.data.room.id)
                        this.$store.commit('putIn',res.data.room)
                    }
                })
        }
    }
}
</script>

<style>
.kk{
    margin: 10px 0 ;
}
.i .el-input__inner{
    background-color: #EDEEF6;
}
.up .el-upload-dragger{
    width: 500px;
}
#e-up{
    margin: 10px;
    width: 500px;
    position: relative;
    left: calc(50% - 500px/2);
}
#ti{
    font-weight: 600;
    margin: 0 0 20px 0;
}
#edit{
    padding: 0 20px;
}
</style>