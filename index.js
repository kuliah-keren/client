new Vue({
    el: "#app",
    data: {
        file: '',
        inputName: '',
        host: 'http://localhost:3000',
        allImages: [],
        resultConvert: [],
        link: ''
    },
    created() {
        this.getAllImages()
    },
    methods: {
        previewFiles: function(link) {
            this.file = link.target.files[0]
        },
        submitFile: function() {
            let formData = new FormData();
            formData.append('file', this.file);
            formData.append('name', this.inputName); 
            axios.post('http://localhost:3000/upload',
                    formData, {})
                .then(function() {

                    console.log('SUCCESS!!');
                    alert('Uploaded')
                    this.getAllImages()
                })
                .catch(function() {
                    alert('Fail to upload')
                });
        },
        getAllImages: function(){
            axios({
                method: 'GET',
                url: `${this.host}/image`
            })
            .then((result) => {
                this.allImages = result.data
            }).catch((err) => {
                console.log(err);
                
            });
        },
        convert(link){
            this.link = ''
            this.resultConvert = []
            this.link = link
            axios({
                method: 'POST',
                url: `${this.host}/convert`,
                data: {
                    imgLink: link
                }
            })
            .then((result) => {
                // console.log(result.data.mata_kuliah);
                this.resultConvert = result.data.mata_kuliah
            }).catch((err) => {
                console.log(err);
                
            });
        },
        download(){ 
            const text = this.resultConvert
            text.unshift('Daftar Mata Kuliah \n')
            let newText = text.join('\n')
            var doc = new jsPDF()
            doc.text(newText, 10, 10)
            doc.save(`${this.link}a4.pdf`)
        }
    }
})
