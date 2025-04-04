import React, { useState, useEffect} from "react";
import axios from "axios";
import { Drawer, Button, Input, Form , Select, Upload, message, DatePicker} from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { LuCloudUpload } from "react-icons/lu";
import { createEntrada } from "../../servicios/blogServicios";

const { TextArea } = Input;
const { Option } = Select;

const CrearDrawer = ({ open, onClose, listaEntradas, listaCategorias, listaAutores}) => {


    const [formulario ] = Form.useForm();

    const [ titulo, setTitulo ] = useState('');
    const [ contenido, setContenido ] = useState('');
    const [ autor, setAutor ] = useState('');
    const [ categorias, setCategorias ] = useState([]);
    const [ imagen, setImagen ] = useState('');

    const clearForm = () => {
        setTitulo('');
        setContenido('');
        setAutor('');
        setCategorias([]);
        setImagen('');
    }

    const guardarEntrada = async (e) => {
        e.preventDefault();
        try {

            await formulario.validateFields();
            const formData = new FormData();
            formData.append('imagen', imagen.originFileObj);
            formData.append('titulo', titulo);
            formData.append('contenido', contenido);
            formData.append('categorias', categorias);
            formData.append('autor', autor);
            const response = await createEntrada(formData);

            
            // listaEntradas();
            onClose();
            clearForm();
            formulario.resetFields();
            await listaEntradas();
        } catch (error) {
            console.log('Error', error);
        }
    }

    useEffect(() => {
        if (!open) {
            clearForm();
        }
    }, [open]);

    return (
        <>

        <Drawer
            title="Crear Entrada"
            width={530}
            onClose={onClose}
            open={open}
            footer={
                <div>
                    <Button onClick={onClose}>Cerrar</Button>
                    {/* <Button onClick={guardarEntrada}>Crear</Button> */}
                    <Button onClick={guardarEntrada}>Crear</Button>
                </div>
            }
        >
            <Form>
                <Form.Item
                    label="Título"
                    name="titulo"
                    rules={[{
                        required: true,
                        message: 'Por favor ingrese el título de la entrada',
                    }]}
                >
                    <Input value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                </Form.Item>
                <Form.Item
                    label="Contenido"
                    name="contenido"
                    rules={[{
                        required: true,
                        message: 'Por favor ingrese el Contenido de la entrada',
                    }]}
                    >
                    <Input.TextArea
                    rows={4}
                    cols={50}
                     value={contenido} 
                     onChange={(e) => setContenido(e.target.value)} 
                     
                     />
                </Form.Item>
                <Form.Item
                    label="Categorias"
                    name="categorias"
                    rules={[{
                        required: true,
                        message: 'Por seleccione una o mas categorías',
                    }]}    
                >
                    <Select
                        mode="multiple"
                        placeholder="Selecione las Categorias"
                        onChange={(e) => setCategorias(e)}
                    >

                        {listaCategorias.map((categoria) => (
                            <Option key={categoria.id} value={categoria.id}>
                                {categoria.nombre}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Autores"
                    rules={[{
                        required: true,
                        message: 'Por seleccione el autor',
                    }]}  
                    >
                    <Select
                        placeholder="Selecione las Categorias"
                        onChange={(e) => setAutor(e)}
                    >

                        {listaAutores.map((autor) => (
                            <Option key={autor.id} value={autor.id}>
                                {autor.usuario.username}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Imagen"
                    name="imagen"
                    extra="Seleccionar la imagen"
                    >
                    <Upload
                        name="imagen"
                        placeholder="Subir Imagen"
                        onChange={(e) => setImagen(e.file)}
                    >
                        <Button icon={<UploadOutlined />}>Subir Imagen</Button>
                        {/* <Button icon={<LuCloudUpload />}>Subir Imagen</Button> */}
                    </Upload>
                </Form.Item>
                <Form.Item label="Fecha Ejemplo">
                    <DatePicker />
                </Form.Item>
            </Form>


        </Drawer>
        
        
        </>
    )
}

export default CrearDrawer;