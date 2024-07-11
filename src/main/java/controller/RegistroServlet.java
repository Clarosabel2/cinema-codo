

package controller;

import java.io.IOException;
import java.sql.Date;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import dao.UsuarioDAO;
import modelo.Usuario;

@WebServlet("/registro")
public class RegistroServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String nombre = request.getParameter("nombre");
        String apellido = request.getParameter("apellido");
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        String fechaNacimiento = request.getParameter("fechaNacimiento");
        String pais = request.getParameter("pais");

        Usuario usuario = new Usuario();
        usuario.setNombre(nombre);
        usuario.setApellido(apellido);
        usuario.setEmail(email);
        usuario.setPassword(password);
        usuario.setFechaNacimiento(Date.valueOf(fechaNacimiento));
        usuario.setPais(pais);

        UsuarioDAO usuarioDAO = new UsuarioDAO();
        try {
            usuarioDAO.insertarUsuario(usuario);
            response.sendRedirect("pages/registrarse.html?exito=true");
        } catch (Exception e) {
            response.sendRedirect("pages/registrarse.html?error=true");
        }
    }
}
