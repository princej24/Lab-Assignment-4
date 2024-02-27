(function() {
    const studentList = document.getElementById("studentList");

    function fetchData() {
        return new Promise((resolve, reject) => {
            fetch("students.json")
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Failed to fetch student data. Please check your internet connection and try again later.");
                    }
                    return response.json();
                })
                .then(students => {
                    setTimeout(() => {
                        resolve(students);
                    }, 2000);
                })
                .catch(error => {
                    reject(error.message);
                });
        });
    }

    function filterCSStudents() {
        fetchData()
            .then(students => {
                const filteredStudents = students.filter(student => {
                    return student.major === "Computer Science" && student.age > 20;
                });
                displayStudents(filteredStudents);
            })
            .catch(error => {
                console.error("Error filtering CS students:", error);
                displayErrorMessage("Failed to filter CS students. " + error);
            });
    }

    function calculateAverageAge() {
        fetchData()
            .then(students => {
                const totalAge = students.reduce((sum, student) => sum + student.age, 0);
                const averageAge = totalAge / students.length;
                studentList.innerHTML = `<p>Average Age: ${averageAge.toFixed(2)}</p>`;
            })
            .catch(error => {
                console.error("Error calculating average age:", error);
                displayErrorMessage("Failed to calculate average age. " + error);
            });
    }

    function filterOddIndexStudents() {
        fetchData()
            .then(students => {
                const oddIndexStudents = students.filter((student, index) => index % 2 !== 0);
                displayStudents(oddIndexStudents);
            })
            .catch(error => {
                console.error("Error filtering students with odd index:", error);
                displayErrorMessage("Failed to filter students with odd index. " + error);
            });
    }

    function displayStudents(students) {
        studentList.innerHTML = "";
        students.forEach(student => {
            const studentDiv = document.createElement("div");
            studentDiv.innerHTML = `
                <h2>${student.name}</h2>
                <p>Age: ${student.age}</p>
                <p>Grade: ${student.grade}</p>
                <p>Major: ${student.major}</p>
            `;
            studentList.appendChild(studentDiv);
        });
    }

    function displayErrorMessage(message) {
        studentList.innerHTML = `<p>Error: ${message}</p>`;
    }

    document.getElementById("filterCS").addEventListener("click", filterCSStudents);
    document.getElementById("calculateAverageAge").addEventListener("click", calculateAverageAge);
    document.getElementById("filterOddIndex").addEventListener("click", filterOddIndexStudents);
})();
