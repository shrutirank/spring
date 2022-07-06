package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.model.Subject;

@Repository
public interface SubjectRepository extends JpaRepository<Subject,Integer> {
}
