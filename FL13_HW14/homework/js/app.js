function Student(name, email) {
	this.name = name;
	this.email = email;
	this.homeworkResults = [];

	return {
		getName: () => {
			return this.name;
		},

		getEmail: () => {
			return this.email;
		},

		getHomeworkResult: () => {
			return this.homeworkResults;
		},

		addHomeworkResult: (topic, success) => {
			this.homeworkResults.push({topic, success});
		}
	}
}

function FrontendLab(students, failedLimit) {
	this.failedHomeworksLimit = failedLimit;
	this.studentsList = students;

	return {
		printStudentsList: () => {
			this.studentsList.forEach((student) => {
				console.log(`name: ${student.getName()}, email: ${student.getEmail()}`);
				console.log(student.getHomeworkResult());
			});
		},

		addHomeworkResults: (homeworkResults) => {
			homeworkResults.results.forEach((result) => {
				const student = this.studentsList.find((student) => student.getEmail() === result.email);
				student.addHomeworkResult(homeworkResults.topic, result.success);
			});
		},

		printStudentsEligibleForTest: () => {
			this.studentsList.forEach((student) => {
				const studentResults = student.getHomeworkResult().filter((el) => el.success === false);
				if(studentResults.length <= this.failedHomeworksLimit) {
					console.log(`name: ${student.getName()}, email: ${student.getEmail()}`);
				}
			});
		}
	}
}