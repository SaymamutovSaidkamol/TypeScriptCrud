import React, { useEffect, useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input, Card, Image } from 'antd';
import axios, { AxiosError, AxiosResponse } from 'axios';
// import { useFetch } from '../../hook/useFeatch';


interface Product {
    name: string;
    price: string;
    image?: string;
    description: string;
    id: number | null;
}
type FieldType = {
    name: string;
    price: string;
    image?: string;
    description: string;
};


const Main: React.FC = () => {
    const [data, setData] = useState<Product[]>([])


    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        axios.post("https://6764223a52b2a7619f5b899a.mockapi.io/card", values).then((res: AxiosResponse) => {
            setData((prevData) => [...prevData, res.data]);
        }).catch((err: AxiosError) => {
            console.log(err.response);
        }).finally()
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        axios.get("https://6764223a52b2a7619f5b899a.mockapi.io/card").then((res: AxiosResponse) => {
            setData(res.data);
        }).catch((err: AxiosError) => {
            console.log(err.response);
        }).finally()
    }, [])

    const handleDelete = (id: number) => {
        console.log(id);

        axios.delete(`https://6764223a52b2a7619f5b899a.mockapi.io/card/${id}`).then((res: AxiosResponse) => {
            console.log(res.data)
            setData(data.filter((prev) => prev.id != res.data.id))
        }).catch((err: AxiosError) => {
            console.log(err.response);
        }).finally()
    }

    const handleUodate = (item: any) => {
        const newItem: FieldType = {
            name: item.name,
            price: item.price,
            image: item.image,
            description: item.description,
        };

        console.log('newItem',newItem);
        
    }

    return (
        <>
            <div className='container mx-auto mt-20 flex justify-center'>
                <div className='w-[400px] flex justify-center py-5 px-3 rounded-[5px] bg-[#ccc]'>
                    <Form
                        name="basic"
                        initialValues={{ remember: false }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        layout="vertical"
                        className="w-full"
                    >
                        <Form.Item<FieldType>
                            label="name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <Input placeholder='name...' />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label="price"
                            name="price"
                            rules={[{ required: true, message: 'Please input your price!' }]}
                        >
                            <Input placeholder='price...' />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label="image"
                            name="image"
                            rules={[{ required: true, message: 'Please input your image!' }]}
                        >
                            <Input placeholder='image URL ...' />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label="description"
                            name="description"

                            rules={[{ required: true, message: 'Please input your description!' }]}
                        >
                            <Input placeholder='description...' />
                        </Form.Item>



                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>


            <div className='container mx-auto border mt-20'>
                <div className='grid grid-cols-4 gap-3'>
                    {
                        data?.map((item: Product) => (
                            <Card
                                key={item.id}
                                hoverable
                                style={{ width: '100%' }}
                                cover={<Image
                                    style={{ width: '100%', height: '200px' }}
                                    // src="https://thumbs.dreamstime.com/z/earth-fresh-spring-green-grass-green-leaf-summer-time-31254943.jpg"
                                    src={item.image}
                                />}
                            >
                                <h1 className='text-[20px] p-2'><strong>{item.name}</strong></h1>
                                <h1 className='text-[18px] p-2'><strong>{item.price} USD</strong></h1>
                                <h1 className='p-2'>{item.description}</h1>

                                <div className=' flex justify-between'>
                                    <button className='cursor-pointer px-2 bg-[#06f33a] text-white rounded-[5px]' onClick={() => handleUodate(item)}>update</button>
                                    <button className='cursor-pointer px-2 bg-red-500 text-white rounded-[5px]' onClick={() => handleDelete(item.id!)} >delete</button>
                                </div>
                            </Card>
                        ))
                    }
                </div>
            </div>
        </>
    );
};

export default Main
