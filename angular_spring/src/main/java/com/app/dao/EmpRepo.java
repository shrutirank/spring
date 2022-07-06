package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.model.Emp;


@Repository
public interface EmpRepo extends JpaRepository<Emp, Integer> {

}
