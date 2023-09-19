package com.growth10Mindset.admin.util;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

	private final EntityManager entityManager;
	
	@Autowired
	public MyDataRestConfig(EntityManager theEntityManager) {
		entityManager = theEntityManager;
	}

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        exposeIds(config);
    }

	private void exposeIds(RepositoryRestConfiguration config) {
		// TODO Auto-generated method stub
		Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();
		List<Class<?>> entityClasses = new ArrayList<>();
		for (EntityType<?> tempType : entities) {
			entityClasses.add(tempType.getJavaType());
		}
		Class<?>[] domainTypes = entityClasses.toArray(new Class<?>[0]);
		config.exposeIdsFor(domainTypes);
	}
}