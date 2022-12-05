import React, {ChangeEvent} from "react";


type ProfileStatusPropsType = {
    status: string
    updateUserStatus: (status: string) => void
}
type ProfileStatusStateType = {
    status: string
    editMode: boolean
}

class ProfileStatus extends React.Component<ProfileStatusPropsType, ProfileStatusStateType> {
    state = {
        editMode: false,
        status: this.props.status
    }
    activateEditMode = () => {
        this.setState(
            {
                editMode: true
            }
        )
    }
    deactivateEditMode = () => {
        this.setState(
            {
                editMode: false
            }
        )
        this.props.updateUserStatus(this.state.status)
    }
    onChangeStatus = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }
    // componentDidUpdate(prevProps: Readonly<ProfileStatusProps>, prevState: Readonly<{}>, snapshot?: any) {
    //     if (prevProps.status !== this.props.status){
    //         this.setState({
    //             status: this.props.status
    //         })
    //     }
    // }

    render(){
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status || "----" }</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input
                            autoFocus={true}
                            onBlur={this.deactivateEditMode}
                            value={this.props.status}
                            onChange={this.onChangeStatus}
                        />
                    </div>
                }
            </div>

        )
    }

}

export default ProfileStatus