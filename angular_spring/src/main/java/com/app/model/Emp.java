package com.app.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;



import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Emp {
	
	private static final int Subject=0;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	
	@Column(name="stu_id")
	private int id;

	private String name;
	private String address;
	private String gender;
	private String date;
	private String hobbie;
	private String cars;
	
	@OneToMany(cascade=CascadeType.ALL)
	@JoinColumn(name="sub_id",referencedColumnName="stu_id")
	private List<Subject> subject;
	
	public List<Subject> getSubject() {
		return subject;
	}

	public void setSubject(List<Subject> subject) {
		this.subject = subject;
	}


	
	public Emp() {
		
	}
	

	public Emp(int id, String name, String address, String gender, String date, String hobbie, String cars) {
		super();
		this.id = id;
		this.name = name;
		this.address = address;
		this.gender = gender;
		this.date = date;
		this.hobbie = hobbie;
		this.cars = cars;
	}

	
	@Override
	public String toString() {
		return "Emp [id=" + id + ", name=" + name + ", address=" + address + ", gender=" + gender + ", date=" + date
				+ ", hobbie=" + hobbie + ", cars=" + cars + ", subject=" + subject + "]";
	}


	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getHobbie() {
		return hobbie;
	}

	public void setHobbie(String hobbie) {
		this.hobbie = hobbie;
	}

	public String getCars() {
		return cars;
	}

	public void setCars(String cars) {
		this.cars = cars;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}