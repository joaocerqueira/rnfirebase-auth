import React, { useState, useEffect } from 'react'
import { Text, View, TextInput, TouchableOpacity, FlatList, Keyboard, Image } from 'react-native';
import { firebase, authentication } from "../firebase/config";
import { FontAwesome } from "@expo/vector-icons";
import styles from './styles';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


const auth = getAuth();



export default function Todos() {

	const [todo, setTodo] = useState(''); // todo
	const [todos, setTodos] = useState([]); // todos
	const todoRef = firebase.firestore().collection('food'); // todos collection reference

	const getAuth = () => {
		signInWithEmailAndPassword(auth, 'jbraga.cerq@gmail.com', '123456')
			.then((userCredential) => {
				// Signed in 
				console.log('logou');
				const user = userCredential.user;
				// ...
			})
			.catch((error) => {
				console.log('NAO logou');
				const errorCode = error.code;
				const errorMessage = error.message;
			});
	};



	// fetch the saved todos realtime
	useEffect(() => {
		todoRef
			// order by time of creating
			.orderBy('createdAt', 'desc')
			// fetch todos in realtime
			.onSnapshot(
				querySnapshot => {
					const newTodos = []
					// loop through the saved todos
					querySnapshot.forEach(doc => {
						const todo = doc.data()
						// console.log(doc.data());
						todo.id = doc.id
						// todo.nome = doc.text + '-'
						// todo.idade = doc.idade
						// todo.imagem =  "require('./assets/images/food1.jpg')",
						newTodos.push(todo)
						console.log(todo)
					});
					// set the todos to the state
					setTodos(newTodos)
				},
				error => {
					// log any error
					console.error(error);
				}
			)

	}, []);

	// add a todo
	const addTodo = () => {
		// check if we have a todo.
		if (todo && todo.length > 0) {
			// get the timestamp
			const timestamp = firebase.firestore.FieldValue.serverTimestamp();
			// structure the data  to save
			const data = {
				text: todo,
				createdAt: timestamp,
				nome: todo,
				idade: 26,
				imagem: "require('./assets/images/food1.jpg')",
			};
			// console.log(data);
			// add the data to firestore db
			todoRef
				.add(data)
				.then(() => {
					// release todo state
					setTodo('');
					// release keyboard
					Keyboard.dismiss();
				})
				.catch((error) => {
					// show an alert in case of error
					alert(error);
				})
		}
	}

	// delete a todo
	const deleteTodo = (todo) => {
		// delete todo from firestore db
		todoRef
			.doc(todo.id)
			.delete()
			.then(() => {
				// show a successful alert
				alert("Deleted successfully");
			})
			.catch(error => {
				// show an error alert
				alert(error);
			})
	}



	// render a todo
	const renderTodo = ({ item }) => {
		// console.log(item.imagem);
		return (
			<View style={styles.todoContainer} >
				<Image source={item.imagem} style={styles.imgList} />
				<Text style={styles.todoText}>
					{item.nome[0].toUpperCase() + item.nome.slice(1)} - {item.idade}
				</Text>
				<View style={styles.textIcons}>
					<FontAwesome name="trash-o" color="red" onPress={() => deleteTodo(item)} style={styles.todoIcon} />
				</View>
				
			</View>
		)
	}

	// View
	return (
		<View style={styles.container}>
			<View style={styles.formContainer}>			
				<TouchableOpacity style={styles.button} onPress={getAuth}>
					<Text style={styles.buttonText}>login</Text>
				</TouchableOpacity>
				<TextInput
					style={styles.input}
					placeholder='Add new todo'
					placeholderTextColor="#aaaaaa"
					onChangeText={(text) => setTodo(text)}
					value={todo}
					underlineColorAndroid="transparent"
					autoCapitalize="none"
				/>
				<TouchableOpacity style={styles.button} onPress={addTodo}>
					<Text style={styles.buttonText}>Add</Text>
				</TouchableOpacity>
			</View>
			
			{/* mapa */ }
			<View style={{width: '90%', height: 200, alignItems: 'center', padding: 10, marginLeft: 20, borderColor: '#333', borderWidth: 5}}>
				<Text>view</Text>
			</View>



			{todos.length > 0 && (
				<View style={styles.listContainer}>
					<FlatList
						data={todos}
						renderItem={renderTodo}
						keyExtractor={(todo) => todo.id}
						removeClippedSubviews={true}
					/>
					
				</View>
			)}

			
		</View>
		
	)
}