
package modelo;

import java.sql.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Usuario {
    private int id;
    private String nombre;
    private String apellido;
    private String email;
    private String password;
    private Date fechaNacimiento;
    private String pais;
}
