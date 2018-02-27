package com.tims.manage;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * @author liuzm
 * @create 2017-11-07 15:47
 **/
@Configuration
@EnableSwagger2
@Profile({"dev", "test", "uat", "local"})
public class Swagger2 {


    @Bean
    public Docket createRestApi() {
        return new Docket(DocumentationType.SWAGGER_2)
            .apiInfo(apiInfo())
            .select()
            .apis(RequestHandlerSelectors.basePackage("com.tims.manage"))
            .paths(PathSelectors.any())
            .build();
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
            .title("hrm接口文档by swagger2")
            .description("swagger遵循严格的restful风格，例如请求方式不规定，则同一个接口的每种请求方式都会在列表中展示")
            .contact("liuzm")
            .version("1.0")
            .build();
    }
}
