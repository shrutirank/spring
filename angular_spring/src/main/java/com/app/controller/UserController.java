package com.app.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.management.loading.PrivateClassLoader;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dao.EmpRepo;
import com.app.dao.SubjectRepository;
import com.app.exception.ResourceNotFoundException;
import com.app.model.Emp;
import com.app.model.Subject;

@RestController
@RequestMapping("/api/v1/")

@CrossOrigin
public class UserController {

	@Autowired
	private EmpRepo employeeRepository;
	
	
	@Autowired
	private SubjectRepository subjectRepository;
	
	//get all employees
		@GetMapping("/emp")
	public List<Emp> getAllEmployees(){
		
		return employeeRepository.findAll();
	}
		
	//create emp rest api
		@PostMapping("/emp")
		public Emp createEmployee(@RequestBody Emp employee) {
			return employeeRepository.save(employee);
		}
		
	//get emp id rest api
		@GetMapping("/emp/{id}")
		public ResponseEntity<Emp> getEmployeeById(@PathVariable int id) {
			Emp employee =employeeRepository.findById(id)
					.orElseThrow(()->new ResourceNotFoundException("employee not exists with id"));
			return ResponseEntity.ok(employee);
		}
		
	//update emp rest api
		@PutMapping("/emp/{id}")
	public ResponseEntity<Emp> updateEmployee(@PathVariable int id,@RequestBody Emp employeeupdate){
			Emp employee =employeeRepository.findById(id)
					.orElseThrow(()->new ResourceNotFoundException("employee not exists with id"));
			employee.setName(employeeupdate.getName());
			employee.setAddress(employeeupdate.getAddress());
			employee.setGender(employeeupdate.getGender());
			employee.setDate(employeeupdate.getDate());
			employee.setHobbie(employeeupdate.getHobbie());
			employee.setCars(employeeupdate.getCars());
			
			
			Emp updatedemp=employeeRepository.save(employee);
			return ResponseEntity.ok(updatedemp);
	}
		
		//Delete empoyee rest api
		@DeleteMapping("/emp/{id}")
		public ResponseEntity< Map<String,Boolean>> deleteEmployee(@PathVariable int id){
			Emp employee =employeeRepository.findById(id)
					.orElseThrow(()->new ResourceNotFoundException("employee not exists with id"));
			
			employeeRepository.delete(employee);
			Map<String,Boolean> response =new HashMap<>();
			response.put("deleted",Boolean.TRUE );
			return ResponseEntity.ok(response);
		}


		
	//DeleteSubject
		@DeleteMapping("/subject/{subjectId}")
		//public ResponseEntity<String> delete(@PathVariable("subjectId") int subjectId){
		
			//this.subjectRepository.deleteById(subjectId);
			//return ResponseEntity.status(HttpStatus.ACCEPTED).body("delete");
		//}
		public ResponseEntity<Map<String, Boolean>> delete(@PathVariable("subjectId") int subjectId){
			Subject subject =subjectRepository.findById(subjectId)
					.orElseThrow(()->new ResourceNotFoundException("employee not exists with id"));
			subjectRepository.deleteById(subjectId);
			Map<String,Boolean> response =new HashMap<>();
			response.put("deleted",Boolean.TRUE );
			return ResponseEntity.ok(response);	
	}
		
}
		
		

