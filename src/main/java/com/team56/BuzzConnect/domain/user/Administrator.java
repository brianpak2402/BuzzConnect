package com.team56.BuzzConnect.domain.user;

import javax.persistence.*;

@Entity
@AttributeOverrides({
    @AttributeOverride(name = "id", column = @Column(name = "admin_id"))
})
public class Administrator extends User {
    // Constructor
    public Administrator() {
        super();
        this.setUserType("Moderator");
    }

    public Administrator(String username, String password) {
        super(username, password);
    }


}