package com.tco.requests;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.ResultSet;

import java.util.*;

public class FindDatabase{

    protected int found = 0;
    protected int limit = 0;
    protected String match;
    protected String[] where;
    protected String[] type;
    protected String input = "";
    protected String output = "Hello";
    final String URL = "jdbc:mariadb://faure.cs.colostate.edu/cs314";
    final String USER = "cs314-db";
    final String PASSWORD = "eiK5liet1uej";

    public FindDatabase(){
        this.match = "Dave";
        this.limit = 10;
        where = new String[50];
        type = new String[50];
        where[0] = "United States";
        type[0] = "airport";
    }

    public FindDatabase(String match, int limit, String[] where, String[] type){
        this();
        this.match = match;
        this.limit = limit;
        this.where = where;
        this.type = type;
    }

    public void connect(){
        match();
        Database();
    }

    public void match(){
        // input += "SELECT NAME, TYPE FROM "
        //         + where[0] + " WHERE NAME LIKE '%"
        //         + match + "%' LIMIT"
        //         + limit + ";";
        input += "SELECT NAME, TYPE FROM world WHERE NAME LIKE '%denver%' LIMIT 10";
    }
    public String process(ResultSet results) throws Exception{
        String out = "";
        while(results.next()){
        out = results.getString("NAME");
        }
        return out;
    }
    public void Database(){
        try(
            Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
            Statement query = conn.createStatement();
            ResultSet results = query.executeQuery(input);
         ){
             output = process(results);
         } catch( Exception e){
            System.err.println("Exception: " + e.getMessage());
        }
    }
}