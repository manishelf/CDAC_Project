package com.parkngo.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.parkngo.pojos.Section;

public interface SectionDao extends JpaRepository<Section, Long> {

}
