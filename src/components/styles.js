import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop:20,
	},
    formContainer: {
        flexDirection: 'row',
        height: 80,
        marginTop: 40,
        marginBottom: 20,
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingLeft: 16,
        flex: 1,
        marginRight: 5
    },
    button: {
        height: 47,
        borderRadius: 5,
        backgroundColor: '#788eec',
        width: 80,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    },
    listContainer: {
        marginTop: 20,
        padding: 20,
    },

	imgList: {
		width: 50,
		height: 50,
		borderWidth: 10,
		borderColor: '#333',
		backgroundColor: '#eee',
	},

    todoContainer: {
        marginTop: 16,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        paddingBottom: 16,
        flex:1,
        justifyContent:'space-between',
        flexDirection:'row',
        width:"100%"
    },
    todoText: {
        fontSize: 16,
        color: '#333333'
    },
    todoIcons:{
        display:'flex',
        flexDirection:"row"
    },
    todoIcon:{
        marginTop:5,
        fontSize:20,
        marginLeft:14,
    },
})