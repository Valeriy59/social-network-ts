import {addPostActionCreator, deletePostActionCreator, profileReducer} from "./profile-reducer";
import {ProfilePageType} from "./state";

let startState: ProfilePageType
beforeEach(() => {
    startState = {
        posts: [
            {id: 1, post: 'Hi, how are you?', likesCount: 12},
            {id: 2, post: "It's my first post", likesCount: 11},
            {id: 3, post: 'How are you?', likesCount: 10}
        ],
        newPostText: 'it-kamasutra',
        profile: {
            aboutMe: '',
            contacts: {
                facebook: '',
                website: '',
                vk: '',
                twitter: '',
                instagram: '',
                youtube: '',
                github: '',
                mainLink: '',
            },
            lookingForAJob: false,
            lookingForAJobDescription: '',
            fullName: '',
            userId: 0,
            photos: {
                small: '',
                large: '',
            },
        },
        status: '',
        profileErrorMessage: '',
        isOwner: true

    }
});

test('new post should be added', () => {
    let action = addPostActionCreator("it-kamasutra")
    let newState = profileReducer(startState,action)

    expect(newState.posts.length).toBe(4);
    expect(newState.posts[3].post).toBe("it-kamasutra");
});

test('length after deleting decrements', () => {
    let action = deletePostActionCreator(1)
    let newState = profileReducer(startState,action)

    expect(newState.posts.length).toBe(2);
});
