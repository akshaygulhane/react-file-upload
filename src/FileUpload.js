import React from 'react'
import axios, { post } from 'axios';

class FileUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
    }
    onFormSubmit(e) {
        e.preventDefault() // Stop form submit
        this.fileUpload(this.state.file).then((response) => {
            console.log(response.data);
        })
    }
    onChange(e) {
        this.setState({ file: e.target.files[0] })
    }
    fileUpload(file) {
        // axios.get(`http://f-stage-dr.autodeploy.tech/rest/session/token`)
        //     .then(res => {
        //         let token = res.data;
        //         console.log(token)
                const url = 'http://f-stage-dr.autodeploy.tech/webform_rest/whistle_blowing_form/upload/upload_file?_format=json';
                const formData = new FormData();
                formData.append('file', file);
                console.log(file)
                const config = {
                    headers: {
                        "Content-Type": "application/octet-stream",
                        "Content-Disposition": 'file; filename="' + file.name + '"',
                        // 'Access-Control-Allow-Origin': '*'
                    }
                }
                console.log('config, ', config)
                return post(url, formData, config)
            // })
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit} >
                <input type="file" onChange={this.onChange} />
                <button type="submit">Upload</button>
            </form>
        )
    }
}



export default FileUpload;