// import React, { useState , useEffect } from 'react';
// import fire from './firebase';
// import "./dataEntry.css";
// import CheckboxTree from 'react-checkbox-tree';

// function DataEntry(props) {

//     const [rooms,setRooms] = useState([]);

    
//     useEffect(() => {
//         const subscriber = fire.firestore()
//           .collection('Questions')
//           .onSnapshot(querySnapshot => {
//             const users = [];
      
//             querySnapshot.forEach(documentSnapshot => {
//               users.push({
//                 ...documentSnapshot.data(),
//                 key: documentSnapshot.id,
//               });
//             });
      
//             setRooms(rooms.push(users))

//             console.log(rooms)
//             // setLoading(false);
//           });
      
//         // Unsubscribe from events when no longer in use
//         return () => subscriber();
//       }, []);

    


//     return (
//         <CheckboxTree
//         nodes={rooms}
//         // checked={this.state.checked}
//         // expanded={this.state.expanded}
//         // onCheck={checked => this.setState({ checked })}
//         // onExpand={expanded => this.setState({ expanded })}
//     />
//     );
// }

// export default DataEntry;