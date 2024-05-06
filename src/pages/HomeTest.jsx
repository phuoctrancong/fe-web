// @ts-check
import React, { useEffect, useState } from "react";
import Helmet from "components/Helmet";
import HeroSlider from "components/HeroSlider";
import Section, { SectionTitle, SectionBody } from "../components/Section";
import heroSliderData from "../assets/fake-data/hero-slider";
import policy from "assets/fake-data/policy";
import PolicyCard from "components/PolicyCard";
import Grid from "components/Grid";
import { Link } from "react-router-dom";
import ProductCard from "components/ProductCard";
import banner from "../assets/images/banner.png";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "constant/config";
import { listProduct } from "redux/actions/product.actions";
import { listTag } from "redux/actions/tag.actions";
import { isEmpty } from "lodash";
export default function HomeTest() {
  const dispatch = useDispatch();
  const [tagProducts, setTagProducts] = useState([]);
  const rootState = useSelector((state) => state);
  const arrTags = rootState?.tag?.items;
  useEffect(() => {
    dispatch(listProduct());
    dispatch(listTag());
  }, [dispatch]);
  useEffect(() => {
    const fetchData = async () => {
      const tagProductsData = [];
      for (const tag of arrTags) {
        try {
          const response = await fetch(
            `${BASE_URL}/products?limit=8&tagId=${tag?.id}`
          );
          const data = await response.json();
          tagProductsData.push({
            tag: tag,
            products: data?.data.items,
          });
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      }
      setTagProducts(tagProductsData);
    };

    fetchData();
  }, [arrTags]); // This effect runs once when the component mounts
  return (
    <Helmet title="Trang chủ">
      {/* {hero slide} */}
      <HeroSlider
        data={heroSliderData}
        control={true}
        auto={true}
        timeOut={5000}
      />
      {/* {end hero slide} */}
      {/* {Policy section} */}
      <Section>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {policy.map((item, index) => (
              <Link key={index} to="/policy">
                <PolicyCard
                  name={item.name}
                  description={item.description}
                  icon={item.icon}
                />
              </Link>
            ))}
          </Grid>
        </SectionBody>
      </Section>
      {/* {End Policy section} */}
      {/* {best selling section} */}
      {!isEmpty(arrTags) ? (
        <>
          {tagProducts.map((tagProduct) => (
            <Section key={tagProduct.tagId}>
              <SectionBody>
                <SectionTitle>{tagProduct.tag.name}</SectionTitle>
                <SectionBody>
                  <Grid col={4} mdCol={2} smCol={1} gap={20}>
                    {tagProduct.products.map((product, index) => (
                      <ProductCard key={index} product={product} />
                    ))}
                  </Grid>
                </SectionBody>
              </SectionBody>
            </Section>
          ))}
        </>
      ) : (
        []
      )}
      {/* {end best selling section} */}
      {/* {new arrival section} */}
      {/* {end new arrival section} */}
      {/* {banner} */}
      <Section>
        <SectionBody>
          <Link to="/catalog">
            <img src={banner} alt="" />
          </Link>
        </SectionBody>
      </Section>
      {/* {end banner} */}
    </Helmet>
  );
}
