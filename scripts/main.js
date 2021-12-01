let dataArray = [];
const body = document.querySelector('body');
const button = document.querySelector("button");
const name = document.getElementById("name");
const age = document.getElementById("age");
const table = document.querySelector('tbody');
const tr = document.querySelectorAll('tr');
const ageHeader = document.querySelector('.ageHeader');
let sort = 0;



const loadPage = () => {
	dataArray.forEach(appendTr);
}

const onSubmit = (event) => {
	const exist = checkName(name);
	
	if (exist) return alert('Este nome ja foi usado')

	dataArray.forEach(cleanTable);
	const data = getData();
	dataArray.push(data);
	dataArray.sort((a, b) => b.age - a.age);
	
	loadPage();
};

const checkName = ({ value }) => {
	const exist = dataArray.some((data) => data.name === value);
	return exist;
};

const getData = () => {
	return {
		id: dataArray.length,
		name: name.value,
		age: age.value
	};
};

const appendTr = (data) => {
	const tr = document.createElement('tr');
	tr.setAttribute('id', data.id)
	tr.innerHTML = `
	<td>${data.name}</td>
	<td>${data.age}</td>
	<td>
	<button type="button" class="delete btn btn-danger">D</button>
	<button type="button" class="edit btn btn-warning">E</button>
	</td>
	`;
	table.appendChild(tr);
};

const cleanTable = () => {
	table.removeChild(table.lastChild);
};

const deleteData = ({ target }) => {
	if (target.classList.contains("delete")) {
		window.confirm('Quer realmente deletar?');
		dataArray.forEach(cleanTable);
		dataArray.forEach((data, index) => {
			if (data.id == target.parentNode.id) {
				dataArray.splice(index, 1)
			}
		});
		loadPage();
	}
};

const editData = ({ target }) => {
	if (target.classList.contains("edit")) {
		target.parentNode.parentNode.innerHTML = `
		<td>
			<input class="form-control" type="text" id="newName" />
		</td>
		<td>
			<input class="form-control" type="number" id="newAge"/>
		</td>
		<td>
			<button disabled type="button" class="btn delete">D</button>
			<button type="button" class="btn btn-success confirm">C</button>
		</td>
			
		
		`;
		const confirm = document.querySelector('.confirm');
		const newName = document.getElementById('newName');
		const newAge = document.getElementById('newAge');
		
		confirm.addEventListener('click', ({ target }) => {
			const exist = checkName(newName);
			if (exist) { 
				dataArray.forEach(cleanTable);
				loadPage();
				return alert('Este nome ja foi usado')
			}
			dataArray.forEach(cleanTable);
			dataArray.forEach((data, index) => {
				if (data.id == target.parentNode.id) {
					dataArray[index] = { 
						...dataArray[index],
						name: newName.value, 
						age: newAge.value
					}
				}
			});
			loadPage();
		})
	}
};

const sortData = () => {
	sort += 1;
	dataArray.forEach(cleanTable);
	dataArray.sort((a, b) => {
		if (sort % 2 === 0) return b.age - a.age
		return a.age - b.age;
	});
	loadPage();
}

button.addEventListener('click', onSubmit)
addEventListener('click', deleteData)
addEventListener('click', editData)
ageHeader.addEventListener('click', sortData)
